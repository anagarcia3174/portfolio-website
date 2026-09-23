/* Pieces of content that appear in both the desktop and phone layouts. */
import { Button, Panel, Tag, TextArea, TextField } from '../nocturne/components';
import { PROFILE, RESUME, SKILL_GROUPS } from '../data/portfolio';

const label = { font: 'var(--type-label)', letterSpacing: 'var(--ls-caps)' };
const paperLink = { color: 'var(--ink-900)', textDecoration: 'underline' };

export function ContactRows({ labelWidth = 76 }) {
  const rows = [
    ['MAIL', <a key="m" href={`mailto:${PROFILE.email}`} style={paperLink}>{PROFILE.email}</a>],
    ['PHONE', <span key="p">{PROFILE.phone}</span>],
    ['GITHUB', <a key="g" href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={paperLink}>{PROFILE.githubHandle}</a>],
    ['LINKEDIN', <a key="l" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={paperLink}>{PROFILE.linkedinHandle}</a>],
  ];
  return (
    <div style={{ display: 'grid', gap: 6, font: 'var(--type-code)', borderTop: '1px solid var(--line-paper)', paddingTop: 8 }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', gap: 10, minWidth: 0 }}>
          <span style={{ width: labelWidth, flex: '0 0 auto', color: 'var(--text-on-paper-muted)' }}>{k}</span>
          <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

export function SkillPanels() {
  return SKILL_GROUPS.map((g) => (
    <Panel key={g.label} tone="inset">
      <div style={{ ...label, color: 'var(--text-dim)', marginBottom: 8 }}>{g.label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
    </Panel>
  ));
}

const paperMuted = 'var(--text-on-paper-muted)';

function SectionHeading({ children }) {
  return (
    <div style={{ ...label, color: paperMuted, borderBottom: '1px solid var(--line-paper)', paddingBottom: 6, marginBottom: 10 }}>
      {children}
    </div>
  );
}

// Title on the left, date on the right (stacked on phones).
function EntryHead({ title, when, stacked }) {
  const titleStyle = { font: 'var(--fw-bold) 16px/1.3 var(--font-display)' };
  const whenStyle = { font: 'var(--type-label)', color: paperMuted, whiteSpace: 'nowrap' };
  return stacked ? (
    <>
      <div style={titleStyle}>{title}</div>
      <div style={{ ...whenStyle, margin: '3px 0' }}>{when}</div>
    </>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
      <span style={titleStyle}>{title}</span>
      <span style={whenStyle}>{when}</span>
    </div>
  );
}

function SubLine({ children }) {
  return <div style={{ font: 'var(--type-code)', color: 'var(--bone-500)', margin: '2px 0 6px' }}>{children}</div>;
}

function Bullets({ items }) {
  return (
    <div style={{ display: 'grid', gap: 5 }}>
      {items.map((b) => (
        <div key={b} style={{ display: 'flex', gap: 8, font: 'var(--type-body-sm)' }}>
          <span style={{ color: 'var(--amber-600)', flex: '0 0 auto' }}>•</span>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function Links({ links }) {
  if (!links.length) return null;
  return (
    <div style={{ font: 'var(--type-code)', marginTop: 6 }}>
      <span style={{ color: paperMuted }}>Links: </span>
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 ? <span style={{ color: paperMuted }}> | </span> : null}
          <a href={l.href} target="_blank" rel="noopener noreferrer" style={paperLink}>{l.label}</a>
        </span>
      ))}
    </div>
  );
}

/* The full resume, section for section as in the PDF, on a paper surface. */
export function ResumeBody({ stacked = false }) {
  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <div style={{ font: 'var(--fw-bold) 28px/1.1 var(--font-display)', letterSpacing: 'var(--ls-tight)' }}>{PROFILE.name}</div>
        <div style={{ font: 'var(--type-code)', marginTop: 8, display: 'flex', flexDirection: stacked ? 'column' : 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 8, rowGap: 2 }}>
          {RESUME.contact.map((c, i) => (
            <span key={c.href} style={{ whiteSpace: 'nowrap' }}>
              {i > 0 && !stacked ? <span style={{ color: paperMuted, marginRight: 8 }}>|</span> : null}
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={paperLink}>{c.label}</a>
            </span>
          ))}
        </div>
      </header>

      <section>
        <SectionHeading>EDUCATION</SectionHeading>
        {RESUME.education.map((ed) => (
          <div key={ed.org} style={{ marginBottom: 10 }}>
            <EntryHead title={ed.org} when={ed.when} stacked={stacked} />
            <SubLine>{ed.detail}</SubLine>
          </div>
        ))}
      </section>

      <section>
        <SectionHeading>TECHNICAL SKILLS</SectionHeading>
        <div style={{ display: 'grid', gap: 4, font: 'var(--type-body-sm)' }}>
          {RESUME.skills.map(([k, v]) => (
            <div key={k}><strong>{k}:</strong> {v}</div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>EXPERIENCE</SectionHeading>
        {RESUME.experience.map((e) => (
          <div key={e.org} style={{ marginBottom: 14 }}>
            <EntryHead title={e.org} when={e.when} stacked={stacked} />
            <SubLine>{e.role}</SubLine>
            <Bullets items={e.bullets} />
            <Links links={e.links} />
          </div>
        ))}
      </section>

      <section>
        <SectionHeading>PROJECTS</SectionHeading>
        {RESUME.projects.map((p) => (
          <div key={p.name} style={{ marginBottom: 14 }}>
            <EntryHead title={p.name} when={p.when} stacked={stacked} />
            <SubLine>{p.tech}</SubLine>
            <div style={{ font: 'var(--type-body-sm)', fontStyle: 'italic', marginBottom: 6 }}>{p.summary}</div>
            <Bullets items={p.bullets} />
            <Links links={p.links} />
          </div>
        ))}
      </section>
    </>
  );
}

export function ContactForm({ form, onCancel, fullWidth = false }) {
  const { formRef, status, onSubmit, reset } = form;
  const busy = status === 'sending';

  if (status === 'sent') {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Panel tone="paper" style={{ font: 'var(--type-body-sm)' }}>
          Message sent. I&apos;ll get back to you soon.
        </Panel>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size={fullWidth ? 'md' : 'sm'} onClick={reset} style={fullWidth ? { width: '100%' } : undefined}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      {status === 'error' ? (
        <div role="alert" style={{ font: 'var(--type-code)', color: 'var(--bone-100)', background: 'var(--red-600)', border: '2px solid var(--line-hard)', borderRadius: 'var(--radius-control)', padding: '6px 10px' }}>
          Couldn&apos;t send. Try again, or email {PROFILE.email}.
        </div>
      ) : null}
      <TextField label="NAME" name="name" placeholder="Enter your name" required disabled={busy} autoComplete="name" />
      <TextField label="EMAIL" name="email" type="email" placeholder="you@example.com" required disabled={busy} autoComplete="email" />
      <TextField label="SUBJECT" name="subject" placeholder="What's this about?" required disabled={busy} />
      <TextArea label="MESSAGE" name="message" rows={fullWidth ? 5 : 4} placeholder="Your message here..." required disabled={busy} />
      {fullWidth ? (
        <Button type="submit" variant="primary" icon="send" disabled={busy} style={{ width: '100%' }}>
          {busy ? 'Sending…' : 'Send'}
        </Button>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="secondary" size="sm" onClick={onCancel}>Later</Button>
          <Button type="submit" variant="primary" size="sm" icon="send" disabled={busy}>
            {busy ? 'Sending…' : 'Send'}
          </Button>
        </div>
      )}
    </form>
  );
}
