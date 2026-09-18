/**
 * GET /resume — streams a freshly generated résumé PDF built from the same
 * data as the site (getResume() + projects). Runs on the Node runtime and is
 * rendered on each request, so downloads always reflect the current content.
 */
import { renderToBuffer } from '@react-pdf/renderer';
import { getResume } from '@/data/aboutResume';
import { projects } from '@/data';
import ResumeDocument from './ResumeDocument';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const resume = getResume();
  const buffer = await renderToBuffer(
    <ResumeDocument resume={resume} projects={projects} />
  );

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Rahul-Raj-Resume.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
