'use client';

/**
 * "Ask my résumé" — a fully self-contained chatbot (no API, no network).
 * Answers are generated locally from the résumé data by createResumeBot,
 * with a small typewriter reveal so it still feels conversational.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { getResume } from '@/data/aboutResume';
import { projects } from '@/data';
import { caseStudies } from '@/data/caseStudies';
import { createResumeBot } from './bot';
import styles from './style.module.scss';

const SUGGESTIONS = [
  'What is his current role?',
  'Does he know React Native?',
  'Which projects use Payload CMS?',
  'How many years of experience?',
];

export default function AskResume() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // {role, content}
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const bot = useMemo(
    () => createResumeBot({ resume: getResume(), projects, caseStudies }),
    []
  );

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function typeOut(full) {
    // Reveal the answer progressively for a conversational feel.
    return new Promise((resolve) => {
      const step = Math.max(2, Math.round(full.length / 90));
      let i = 0;
      const tick = () => {
        i = Math.min(full.length, i + step);
        const slice = full.slice(0, i);
        setMessages((prev) => {
          const copy = prev.slice();
          copy[copy.length - 1] = { role: 'assistant', content: slice };
          return copy;
        });
        if (i < full.length) {
          setTimeout(tick, 16);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || busy) return;
    setInput('');

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: question },
      { role: 'assistant', content: '' },
    ]);
    setBusy(true);

    const reply = bot.answer(question);
    // Brief "thinking" pause, then type the answer out.
    await new Promise((r) => setTimeout(r, 350));
    await typeOut(reply);
    setBusy(false);
  }

  return (
    <div className="no-print">
      {!open && (
        <button
          type="button"
          className={styles.launcher}
          onClick={() => setOpen(true)}
          aria-label="Ask my résumé"
        >
          <span className={styles.launcherDot} aria-hidden />
          Ask my résumé
        </button>
      )}

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Ask my résumé">
          <header className={styles.head}>
            <div>
              <p className={styles.headTitle}>Ask my résumé</p>
              <p className={styles.headSub}>Answers from Rahul&apos;s CV · runs on-device</p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </header>

          <div className={styles.body} ref={scrollRef}>
            {messages.length === 0 && (
              <div className={styles.intro}>
                <p>Hi! Ask me anything about Rahul&apos;s experience, skills, or projects.</p>
                <div className={styles.chips}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={styles.chip}
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.assistant}`}
              >
                {m.content ||
                  (busy && i === messages.length - 1 ? (
                    <span className={styles.typing}>
                      <span /><span /><span />
                    </span>
                  ) : (
                    ''
                  ))}
              </div>
            ))}
          </div>

          <form
            className={styles.inputRow}
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about experience, skills, projects…"
              aria-label="Your question"
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={busy || !input.trim()}
              aria-label="Send"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
