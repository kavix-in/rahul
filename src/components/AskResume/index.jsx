'use client';

/**
 * "Ask my résumé" — a floating AI chat that answers recruiter questions,
 * grounded on Rahul's résumé data via /api/chat (streamed responses).
 */
import { useEffect, useRef, useState } from 'react';
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
  const [streaming, setStreaming] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || streaming) return;
    setInput('');
    setUnavailable(false);

    const next = [...messages, { role: 'user', content: question }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 503) {
        setUnavailable(true);
        setMessages(next); // drop the empty assistant bubble
        setStreaming(false);
        return;
      }
      if (!res.ok || !res.body) throw new Error('request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = prev.slice();
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = prev.slice();
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Sorry — something went wrong. Please try again.',
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
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
              <p className={styles.headSub}>AI-powered · answers from Rahul&apos;s CV</p>
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
                  (streaming && i === messages.length - 1 ? (
                    <span className={styles.typing}>
                      <span /><span /><span />
                    </span>
                  ) : (
                    ''
                  ))}
              </div>
            ))}

            {unavailable && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                The AI chat isn&apos;t enabled on this deployment yet. You can still reach
                Rahul directly via the Contact section.
              </div>
            )}
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
              disabled={streaming || !input.trim()}
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
