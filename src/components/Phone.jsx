/* Phone layout — implements "Portfolio Phone.dc.html" from the Claude Design export. */
import { useEffect, useRef, useState } from 'react';
import pfp from '../assets/pfp.png';
import resumePdf from '../assets/AnaGarciaResume.pdf';
import { Button, Icon, Panel, Tag } from '../nocturne/components';
import { EDUCATION, OS_NAME, PROFILE, PROJECTS } from '../data/portfolio';
import { useContactForm } from '../hooks';
import { ContactForm, ContactRows, ResumeBody, SkillPanels } from './shared';

const APPS = [
  { id: 'about', label: 'about me', icon: 'user-round' },
  { id: 'works', label: 'projects', icon: 'folder' },
  { id: 'skills', label: 'skills', icon: 'sliders-horizontal' },
  { id: 'resume', label: 'resume', icon: 'file-text' },
  { id: 'mail', label: 'contact me', icon: 'mail' },
  { id: 'github', label: 'github', icon: 'git-branch', href: PROFILE.github },
];

const TITLES = { about: 'readme.txt', works: 'projects', skills: 'skills.monitor', resume: 'resume.pdf', mail: 'contact me' };

const labelStyle = { font: 'var(--type-label)', letterSpacing: 'var(--ls-caps)' };
const tile = { display: 'grid', placeItems: 'center', border: '2px solid var(--line-hard)', borderRadius: 8, boxShadow: '2px 2px 0 var(--line-hard)' };

function AppLauncher({ app, onOpen }) {
  const s = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '6px 2px', background: 'transparent', border: 0, color: 'var(--text-body)', font: 'var(--type-icon-label)', cursor: 'pointer', textDecoration: 'none' };
  const inner = (
    <>
      <span style={{ ...tile, width: 60, height: 60, background: 'var(--surface-window-raised)' }}>
        <Icon name={app.icon} size={26} color="var(--bone-100)" aria-hidden="true" />
      </span>
      <span>{app.label}</span>
    </>
  );
  return app.href ? (
    <a href={app.href} target="_blank" rel="noopener noreferrer" style={s}>{inner}</a>
  ) : (
    <button type="button" onClick={() => onOpen(app.id)} style={s}>{inner}</button>
  );
}

export default function Phone() {
  const form = useContactForm();
  const [screen, setScreen] = useState('home');
  const scrollRef = useRef(null);

  // Lets index.css color the areas behind Safari's status bar and toolbar to match the phone chrome.
  useEffect(() => {
    document.documentElement.classList.add('phone');
    return () => document.documentElement.classList.remove('phone');
  }, []);

  const go = (id) => {
    setScreen(id);
    scrollRef.current?.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--surface-desktop)',
        backgroundImage: 'var(--bg-grid)',
        backgroundSize: 'var(--grid-size) var(--grid-size)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 26, padding: '0 10px', background: 'var(--olive-600)', color: 'var(--text-on-chrome)', borderBottom: '2px solid var(--line-hard)', ...labelStyle, flex: '0 0 auto' }}>
        <span>{OS_NAME.toUpperCase()} 1.0</span>
      </div>

      {screen === 'home' ? (
        <main ref={scrollRef} className="nos-scroll" style={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
          <Panel tone="paper">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src={pfp} alt="Ana Garcia" style={{ display: 'block', width: 62, height: 62, flex: '0 0 auto', objectFit: 'cover', border: '2px solid var(--line-hard)', borderRadius: 2, filter: 'saturate(0.85)' }} />
              <div style={{ minWidth: 0 }}>
                <h1 style={{ margin: 0, font: 'var(--fw-bold) 20px/1.15 var(--font-display)', letterSpacing: 'var(--ls-tight)' }}>{PROFILE.name}</h1>
                <div style={{ ...labelStyle, color: 'var(--text-on-paper-muted)', marginTop: 4 }}>{PROFILE.title}</div>
                <div style={{ font: 'var(--type-code)', color: 'var(--bone-500)', marginTop: 4 }}>{PROFILE.site}</div>
              </div>
            </div>
          </Panel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {APPS.map((a) => <AppLauncher key={a.id} app={a} onOpen={go} />)}
          </div>

          <Panel tone="inset" style={{ font: 'var(--type-code)', lineHeight: 1.55 }}>
            <div style={{ ...labelStyle, color: 'var(--text-dim)', marginBottom: 8 }}>NOW BUILDING</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div><strong>Talkie</strong> — a social app for tracking movies and TV.</div>
              <div><strong>NailzByDardo</strong> — a salon management system running a real business.</div>
            </div>
          </Panel>
        </main>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: '1 1 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 30, padding: '0 8px', background: 'var(--surface-chrome)', color: 'var(--text-on-chrome)', borderBottom: '2px solid var(--line-hard)', flex: '0 0 auto' }}>
            <button type="button" onClick={() => go('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 0, color: 'inherit', font: 'var(--type-menu)', cursor: 'pointer', padding: 0, width: 56 }}>
              <Icon name="chevron-left" size={13} aria-hidden="true" />
              Home
            </button>
            <span style={{ flex: '1 1 auto', textAlign: 'center', font: 'var(--type-window-title)', letterSpacing: 'var(--ls-caps)' }}>{TITLES[screen]}</span>
            <span style={{ width: 56 }} />
          </div>

          <main ref={scrollRef} className="nos-scroll" style={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {screen === 'about' && (
              <>
                <Panel tone="paper">
                  <p style={{ margin: '0 0 12px', font: 'var(--type-body-sm)' }}>{PROFILE.bio}</p>
                  <ContactRows labelWidth={64} />
                </Panel>
                <Panel tone="inset">
                  <div style={{ ...labelStyle, color: 'var(--text-dim)', marginBottom: 10 }}>EDUCATION</div>
                  {EDUCATION.map((ed) => (
                    <div key={ed.org} style={{ marginBottom: 10 }}>
                      <div style={{ font: 'var(--fw-bold) 15px/1.3 var(--font-display)' }}>{ed.org}</div>
                      <div style={{ font: 'var(--type-code)', color: 'var(--text-muted)' }}>{ed.degree}</div>
                      {ed.notes.length ? <div style={{ font: 'var(--type-code)', color: 'var(--text-muted)' }}>{ed.notes[0]}</div> : null}
                      <div style={{ font: 'var(--type-label)', color: 'var(--text-dim)', marginTop: 2 }}>{ed.when}</div>
                    </div>
                  ))}
                </Panel>
              </>
            )}

            {screen === 'works' &&
              PROJECTS.map((p) => (
                <Panel key={p.id} tone="raised">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <img src={p.image} alt="" style={{ display: 'block', width: 64, height: 64, flex: '0 0 auto', objectFit: 'cover', border: '2px solid var(--line-hard)', borderRadius: 2, filter: 'saturate(0.8)' }} />
                      <div style={{ minWidth: 0 }}>
                        <h2 style={{ margin: 0, font: 'var(--fw-bold) 17px/1.2 var(--font-display)', letterSpacing: 'var(--ls-tight)' }}>{p.name}</h2>
                        <div style={{ ...labelStyle, color: 'var(--text-dim)', margin: '4px 0 6px' }}>{p.when}</div>
                        <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>{p.about}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {p.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {p.links.map((l) => (
                        <Button key={l.label} variant="secondary" size="sm" icon={l.icon} href={l.href}>{l.label}</Button>
                      ))}
                    </div>
                  </div>
                </Panel>
              ))}

            {screen === 'skills' && <SkillPanels />}

            {screen === 'resume' && (
              <>
                <Panel tone="paper" style={{ display: 'grid', gap: 18, padding: 16 }}>
                  <ResumeBody stacked />
                </Panel>
                <Button variant="primary" icon="download" href={resumePdf} download="AnaGarciaResume.pdf" style={{ width: '100%' }}>Download resume.pdf</Button>
              </>
            )}

            {screen === 'mail' && <ContactForm form={form} fullWidth />}
          </main>
        </div>
      )}

      <nav style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', padding: 8, paddingBottom: 'max(8px, env(safe-area-inset-bottom))', background: 'var(--olive-600)', borderTop: '2px solid var(--line-hard)' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {APPS.slice(0, 5).map((a) => (
            <button
              key={a.id}
              type="button"
              title={a.label}
              aria-label={a.label}
              className="nos-press"
              onClick={() => go(a.id)}
              style={{ ...tile, width: 42, height: 42, background: screen === a.id ? 'var(--state-selected)' : 'var(--surface-window-raised)', cursor: 'pointer' }}
            >
              <Icon name={a.icon} size={20} color="var(--bone-100)" aria-hidden="true" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
