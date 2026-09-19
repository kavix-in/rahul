/**
 * POST /api/chat — "Ask my résumé" grounded Q&A.
 *
 * Answers strictly from Rahul's résumé data (getResume() + case studies +
 * projects), streamed back as plain text. The Anthropic API key stays
 * server-side (ANTHROPIC_API_KEY). If the key isn't set, returns 503 so the
 * UI can degrade gracefully.
 */
import Anthropic from '@anthropic-ai/sdk';
import { getResume } from '@/data/aboutResume';
import { projects } from '@/data';
import { caseStudies } from '@/data/caseStudies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Compact, factual knowledge base built from the same data the site renders. */
function buildSystemPrompt() {
  const R = getResume();

  const experience = R.experience
    .map(
      (j) =>
        `- ${j.title} @ ${j.company} (${j.location}) — ${j.period} · ${j.duration}${j.ongoing ? ' (current)' : ''}\n` +
        j.bullets.map((b) => `    • ${b}`).join('\n')
    )
    .join('\n');

  const education = R.education
    .map((e) => `- ${e.credential}, ${e.school} (${e.period}${e.note ? `, ${e.note}` : ''})`)
    .join('\n');

  const clients = (R.enterpriseClients || []).map((c) => c.name).join(', ');

  const work = projects
    .map((p) => {
      const cs = caseStudies[p.slug];
      if (cs) {
        return `- ${p.title} — ${cs.summary} Stack: ${cs.stack.join(', ')}. (${p.link})`;
      }
      return `- ${p.title} (${p.link})`;
    })
    .join('\n');

  return `You are the résumé assistant for ${R.name}'s portfolio site. Recruiters and hiring managers chat with you to learn about ${R.name}. Answer their questions accurately and concisely using ONLY the information below.

# About ${R.name}
Role: ${R.role}
Tagline: ${R.tagline}
Location: ${R.location}
Total experience: ${R.yearsExperience} years
Summary: ${R.summary}

# Skills
- Primary: ${R.skills.primary}
- Programming: ${R.skills.programming}
- Databases: ${R.skills.databases}
- Tools & DevOps: ${R.skills.tools}
- CMS: ${R.skills.cms}

# Experience
${experience}

# Enterprise clients supported (work support)
${clients}

# Selected work / projects
${work}

# Education
${education}

# Contact
Email: ${R.email} · Phone: ${R.phone} · Résumé PDF: available on the site via the "Résumé" button.

# How to respond
- Speak about ${R.name} in the third person, in a warm, professional recruiter-facing tone.
- Be concise: 1–4 sentences or a short bullet list. Lead with the direct answer.
- Only use facts from the information above. If asked something not covered (salary expectations, availability specifics, personal details, unlisted tech), say you don't have that detail here and suggest contacting ${R.name} directly at ${R.email}.
- Never invent projects, employers, dates, or metrics.
- If asked to do something unrelated to ${R.name}'s background (write code, general questions), politely redirect to résumé topics.`;
}

/** Keep only well-formed user/assistant turns, cap size to prevent abuse. */
function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'Chat is not configured. Set ANTHROPIC_API_KEY to enable it.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const messages = sanitizeMessages(body.messages);
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'A user message is required.' }, { status: 400 });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: 'claude-opus-4-8',
          max_tokens: 1024,
          output_config: { effort: 'low' },
          system: buildSystemPrompt(),
          messages,
        });

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            '\n\nSorry — something went wrong answering that. Please try again.'
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
