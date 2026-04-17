function formatTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function normalizeLink(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const palette = ['#111111', '#161616', '#1c1c1c', '#212121', '#262626', '#141414', '#181818', '#1a1a1a'];

const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

/**
 * Parse heterogeneous date strings for sorting (most recent first).
 * Supports: "2d ago", "M/D/YY", "Mon DD", "Mon DD, YYYY"
 */
function parseSortDate(dateStr) {
  const s = dateStr.trim();
  const lower = s.toLowerCase();
  const now = new Date();

  const daysAgo = lower.match(/^(\d+)\s*d\s*ago$/);
  if (daysAgo) {
    const d = new Date(now);
    d.setDate(d.getDate() - parseInt(daysAgo[1], 10));
    return d.getTime();
  }

  const hoursAgo = lower.match(/^(\d+)\s*h\s*ago$/);
  if (hoursAgo) {
    const d = new Date(now);
    d.setHours(d.getHours() - parseInt(hoursAgo[1], 10));
    return d.getTime();
  }

  const slash = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slash) {
    const month = parseInt(slash[1], 10) - 1;
    const day = parseInt(slash[2], 10);
    let y = parseInt(slash[3], 10);
    if (y < 100) y += 2000;
    return new Date(y, month, day).getTime();
  }

  const mon = lower.match(
    /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:,?\s*(\d{2,4}))?$/
  );
  if (mon) {
    const mi = MONTHS[mon[1]];
    const day = parseInt(mon[2], 10);
    let y = mon[3] ? parseInt(mon[3], 10) : now.getFullYear();
    if (mon[3] && mon[3].length === 2) y += 2000;
    if (!mon[3]) {
      const tryDate = new Date(y, mi, day);
      if (tryDate > now) y -= 1;
    }
    return new Date(y, mi, day).getTime();
  }

  return 0;
}

const rawProjects = [
  { name: 'liza-pavlakos', link: 'www.lizapavlakos.com', date: '7/11/24', thumb: 'Norliza.avif' },
  { name: 'mind-step', link: 'www.mindstepleadership.com', date: 'Jan 29', thumb: 'MindStep-Leadership.avif' },
  { name: 'small-screen', link: 'www.smallscreenmarketing.com', date: '12/15/25', thumb: 'smallscreenmarketing.avif' },
  { name: 'speakers-solutions', link: 'www.speakerssolutions.com.au', date: '2d ago', thumb: 'speakers_solutions.avif' },
  { name: 'sunnystate', link: 'sunnystateagency.vercel.app', date: 'Apr 13', thumb: 'sunnystate.avif' },
  { name: 'coastland', link: 'coastland.vercel.app', date: 'Mar 21', thumb: 'COASTLAND.avif' },
  { name: 'ekaa', link: 'ekaa.vercel.app', date: 'Mar 21', thumb: 'ekka.avif' },
  { name: 'spadtek', link: 'www.spadtek.com', date: 'Mar 7', thumb: 'SPADTEK.avif' },
  { name: 'ncg', link: 'www.ncgrp.se', date: 'Jan 26', thumb: 'ncg.avif' },
  { name: 'morf-fe', link: 'morf-new.vercel.app/customiser', date: '6/12/25', thumb: 'Morf.avif' },
  { name: 'mind-hub', link: 'mymindhub.vercel.app', date: '12/15/25', thumb: 'MyMindHub.avif' },
  { name: 'upgrad', link: 'demo-upgrad.kurage.in', date: '11/17/22', thumb: 'upgrade.avif' },
  { name: 'faeves', link: 'demo-faeves.kurage.in', date: '11/20/24', thumb: 'faves.avif' },
  { name: 'digilife', link: 'digilife-jet.vercel.app', date: '1/16/23', thumb: 'Digilife.avif' },
  { name: 'agrim', link: 'demo-agrim.kurage.in', date: '4/11/25', thumb: 'agrim.avif' },
  { name: 'uptik-fe', link: 'www.uptiksolution.com', date: '5/29/25', thumb: 'upteck.avif' },
  { name: 'join-with-me', link: 'www.joinwithme.in', date: 'Apr 17', thumb: 'joinwithme.avif' },
];

const sortedRaw = [...rawProjects].sort(
  (a, b) => parseSortDate(b.date) - parseSortDate(a.date)
);

export const projects = sortedRaw.map((p, i) => ({
  slug: p.name,
  title: formatTitle(p.name),
  description: `Last updated · ${p.date}`,
  src: `/projects/${p.thumb}`,
  link: normalizeLink(p.link),
  color: palette[i % palette.length],
}));

/** Curated list for the SlidingImages section only (order preserved) */
const SLIDING_IMAGES_SLUGS = [
  'speakers-solutions',
  'sunnystate',
  'ekaa',
  'spadtek',
];

export const slidingImagesProjects = SLIDING_IMAGES_SLUGS.map((slug) =>
  projects.find((p) => p.slug === slug)
).filter(Boolean);
