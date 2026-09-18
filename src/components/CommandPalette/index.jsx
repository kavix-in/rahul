'use client';

/**
 * ⌘K / Ctrl+K command palette — jump to any section, download the résumé,
 * copy email, or open a social link. Fully keyboard-driven (↑ ↓ Enter Esc).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { aboutResume as R } from '@/data/aboutResume';
import { socialLinks } from '@/config/social';
import styles from './style.module.scss';

const SECTIONS = [
  { label: 'Summary', hint: 'Overview', target: '#summary' },
  { label: 'Experience', hint: 'Work history', target: '#experience' },
  { label: 'Skills', hint: 'Tech stack', target: '#skills' },
  { label: 'Enterprise Clients', hint: 'Work support', target: '#clients' },
  { label: 'Selected Work', hint: 'Projects', target: '#work' },
  { label: 'Education', hint: 'Academics', target: '#education' },
  { label: 'Contact', hint: 'Get in touch', target: '#contact' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const go = (target) => () => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const list = [
      ...SECTIONS.map((s) => ({
        id: `go:${s.target}`,
        label: `Go to ${s.label}`,
        hint: s.hint,
        group: 'Navigate',
        run: go(s.target),
      })),
      {
        id: 'resume',
        label: 'Download Résumé (PDF)',
        hint: 'Live-generated',
        group: 'Actions',
        run: () => window.open(R.resumePdf, '_blank'),
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: R.email,
        group: 'Actions',
        run: async () => {
          try {
            await navigator.clipboard.writeText(R.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          } catch {
            window.location.href = `mailto:${R.email}`;
          }
        },
        keepOpen: true,
      },
      {
        id: 'email',
        label: 'Send an email',
        hint: R.email,
        group: 'Actions',
        run: () => { window.location.href = `mailto:${R.email}`; },
      },
      {
        id: 'call',
        label: 'Call',
        hint: R.phone,
        group: 'Actions',
        run: () => { window.location.href = `tel:${R.phoneE164}`; },
      },
      ...socialLinks
        .filter((s) => s.id !== 'email')
        .map((s) => ({
          id: `social:${s.id}`,
          label: s.title,
          hint: 'Open link',
          group: 'Social',
          run: () => window.open(s.href, '_blank', 'noopener'),
        })),
    ];

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint && i.hint.toLowerCase().includes(q)) ||
        i.group.toLowerCase().includes(q)
    );
  }, [query]);

  // Open/close via keyboard shortcut
  useEffect(() => {
    const onKey = (e) => {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener('keydown', onKey);
    window.addEventListener('command-palette:toggle', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('command-palette:toggle', onToggle);
    };
  }, []);

  // Reset + focus when opening
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keep active index in range as the list filters
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(items.length - 1, 0)));
  }, [items.length]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const runItem = (item) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) setOpen(false);
  };

  const onListKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(items[active]);
    }
  };

  if (!open) return null;

  let lastGroup = null;

  return (
    <div
      className={`${styles.overlay} no-print`}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className={styles.panel}>
        <div className={styles.searchRow}>
          <span className={styles.searchIcon} aria-hidden>⌕</span>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search or jump to…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onListKey}
            aria-label="Search commands"
          />
          <kbd className={styles.esc}>ESC</kbd>
        </div>

        <ul className={styles.list}>
          {items.length === 0 && (
            <li className={styles.empty}>No matches</li>
          )}
          {items.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {showGroup && <li className={styles.group}>{item.group}</li>}
                <li
                  className={`${styles.item} ${i === active ? styles.active : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => { e.preventDefault(); runItem(item); }}
                >
                  <span className={styles.itemLabel}>
                    {item.id === 'copy-email' && copied ? 'Copied!' : item.label}
                  </span>
                  {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                </li>
              </div>
            );
          })}
        </ul>

        <div className={styles.footer}>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
