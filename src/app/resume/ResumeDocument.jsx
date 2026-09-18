/**
 * Print-ready résumé rendered from the same data that powers the site
 * (see getResume() + projects). Because the PDF is generated on request,
 * it always reflects the current content — including live-computed
 * experience durations and total years.
 */
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';

const COLORS = {
  ink: '#141414',
  body: '#33373d',
  muted: '#6b7280',
  hair: '#e2e5ea',
  accent: '#4f46e5',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.5,
    color: COLORS.body,
  },

  /* Header */
  header: { marginBottom: 14 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: COLORS.ink, letterSpacing: 0.2 },
  role: { fontSize: 11, color: COLORS.accent, marginTop: 3, fontFamily: 'Helvetica-Bold' },
  tagline: { fontSize: 9, color: COLORS.muted, marginTop: 2 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  contactItem: { fontSize: 8.5, color: COLORS.body, marginRight: 14 },
  contactLink: { fontSize: 8.5, color: COLORS.accent, marginRight: 14, textDecoration: 'none' },

  rule: { borderBottomWidth: 1, borderBottomColor: COLORS.hair, marginVertical: 12 },

  /* Sections */
  section: { marginBottom: 13 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.ink,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 7,
  },
  summary: { fontSize: 9.5, color: COLORS.body, lineHeight: 1.55 },

  /* Experience */
  job: { marginBottom: 10 },
  jobHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  jobTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  jobCompany: { fontSize: 9, color: COLORS.accent, marginTop: 1 },
  jobPeriod: { fontSize: 8.5, color: COLORS.muted, textAlign: 'right' },
  jobDuration: { fontSize: 8, color: COLORS.muted, textAlign: 'right', marginTop: 1 },
  bulletRow: { flexDirection: 'row', marginTop: 3, paddingRight: 6 },
  bulletDot: { width: 10, fontSize: 9, color: COLORS.accent },
  bulletText: { flex: 1, fontSize: 9, color: COLORS.body, lineHeight: 1.45 },

  /* Skills */
  skillRow: { flexDirection: 'row', marginBottom: 4 },
  skillLabel: { width: 92, fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  skillValue: { flex: 1, fontSize: 9, color: COLORS.body },

  /* Chips (clients / focus) */
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    fontSize: 8.5,
    color: COLORS.body,
    borderWidth: 1,
    borderColor: COLORS.hair,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },

  /* Projects / education two-up */
  twoCol: { flexDirection: 'row', flexWrap: 'wrap' },
  projItem: { width: '50%', paddingRight: 12, marginBottom: 6 },
  projName: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  projLink: { fontSize: 8, color: COLORS.accent, textDecoration: 'none' },

  eduItem: { marginBottom: 6 },
  eduSchool: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  eduCred: { fontSize: 9, color: COLORS.body },
  eduMeta: { fontSize: 8, color: COLORS.muted },
});

function Section({ title, children }) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function ResumeDocument({ resume: R, projects = [] }) {
  return (
    <Document
      title={`${R.name} — Résumé`}
      author={R.name}
      subject={R.role}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{R.name}</Text>
          <Text style={styles.role}>{R.role}</Text>
          <Text style={styles.tagline}>{R.tagline}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{R.location}</Text>
            <Link style={styles.contactLink} src={`mailto:${R.email}`}>{R.email}</Link>
            <Link style={styles.contactLink} src={`tel:${R.phoneE164}`}>{R.phone}</Link>
          </View>
        </View>

        <View style={styles.rule} />

        {/* Summary */}
        <Section title="Summary">
          <Text style={styles.summary}>{R.summary}</Text>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {R.experience.map((job) => (
            <View key={`${job.company}-${job.period}`} style={styles.job} wrap={false}>
              <View style={styles.jobHeadRow}>
                <View>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobCompany}>
                    {job.company} · {job.location}
                  </Text>
                </View>
                <View>
                  <Text style={styles.jobPeriod}>{job.period}</Text>
                  <Text style={styles.jobDuration}>
                    {job.duration}{job.ongoing ? ' · ongoing' : ''}
                  </Text>
                </View>
              </View>
              {job.bullets.map((b, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills">
          {[
            ['Primary', R.skills.primary],
            ['Programming', R.skills.programming],
            ['Databases', R.skills.databases],
            ['Tools & DevOps', R.skills.tools],
          ].map(([label, value]) => (
            <View key={label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{label}</Text>
              <Text style={styles.skillValue}>{value}</Text>
            </View>
          ))}
        </Section>

        {/* Enterprise Clients */}
        {R.enterpriseClients?.length ? (
          <Section title="Enterprise Clients (Work Support)">
            <View style={styles.chipWrap}>
              {R.enterpriseClients.map((c) => (
                <Text key={c.name} style={styles.chip}>{c.name}</Text>
              ))}
            </View>
          </Section>
        ) : null}

        {/* Selected Work */}
        {projects.length ? (
          <Section title="Selected Work">
            <View style={styles.twoCol}>
              {projects.slice(0, 12).map((p) => (
                <View key={p.slug} style={styles.projItem}>
                  <Text style={styles.projName}>{p.title}</Text>
                  <Link style={styles.projLink} src={p.link}>
                    {p.link.replace(/^https?:\/\//, '')}
                  </Link>
                </View>
              ))}
            </View>
          </Section>
        ) : null}

        {/* Education */}
        <Section title="Education">
          {R.education.map((ed) => (
            <View key={ed.school} style={styles.eduItem}>
              <Text style={styles.eduSchool}>{ed.school}</Text>
              <Text style={styles.eduCred}>{ed.credential}</Text>
              <Text style={styles.eduMeta}>
                {ed.period}{ed.note ? ` · ${ed.note}` : ''}
              </Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}
