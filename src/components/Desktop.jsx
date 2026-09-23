/* Desktop layout — implements "Portfolio Desktop.dc.html" from the Claude Design export. */
import { useRef, useState } from 'react';
import pfp from '../assets/pfp.png';
import resumePdf from '../assets/AnaGarciaResume.pdf';
import { Button, DesktopIcon, Dock, Icon, MenuBar, Panel, StatusBar, Tag, Window } from '../nocturne/components';
import { OS_NAME, PROFILE, PROJECTS } from '../data/portfolio';
import { formatClock, useClock, useContactForm } from '../hooks';
import { ContactForm, ContactRows, ResumeBody, SkillPanels } from './shared';

const BASE_W = 1280;
const BASE_H = 800;
const MAX_SCALE = 1.35; // how far the desktop may grow on big monitors

// Window positions inside the 1280×800 composition (centered on larger screens).
const HOME = {
  about: { x: 100, y: 16 },
  works: { x: 420, y: 150 },
  system: { x: 130, y: 110 },
  resume: { x: 470, y: 6 },
  mail: { x: 725, y: 180 },
};

const APPS = [
  { id: 'about', icon: 'user-round', label: 'About' },
  { id: 'works', icon: 'folder', label: 'Projects' },
  { id: 'system', icon: 'sliders-horizontal', label: 'Skills' },
  { id: 'resume', icon: 'file-text', label: 'Resume' },
  { id: 'mail', icon: 'mail', label: 'Contact' },
];

const labelStyle = { font: 'var(--type-label)', letterSpacing: 'var(--ls-caps)' };

export default function Desktop({ viewport }) {
  const now = useClock();
  const form = useContactForm();

  // Scale to fit small screens; grow (up to MAX_SCALE) and fill the viewport on big ones.
  const scale = Math.min(MAX_SCALE, viewport.w / BASE_W, viewport.h / BASE_H);
  const W = viewport.w / scale;
  const H = viewport.h / scale;
  const ox = Math.max(0, (W - BASE_W) / 2);
  const oy = Math.max(0, (H - BASE_H) / 2);

  const [open, setOpen] = useState(['about', 'works']);
  const [pos, setPos] = useState(HOME);
  const [zs, setZs] = useState({ about: 11, works: 12 });
  const [topZ, setTopZ] = useState(12);
  const [active, setActive] = useState('works');
  const [projectId, setProjectId] = useState('talkie');
  const noteRef = useRef(null);

  const focus = (id) => {
    if (zs[id] === topZ) return;
    setTopZ((z) => z + 1);
    setZs((s) => ({ ...s, [id]: topZ + 1 }));
    if (id !== 'note') setActive(id);
  };

  const launch = (id) => {
    setOpen((o) => (o.includes(id) ? o : [...o, id]));
    focus(id);
    setActive(id);
  };

  const close = (id) => {
    setOpen((o) => o.filter((x) => x !== id));
    setActive((a) => (a === id ? null : a));
  };

  // Drag in composition coordinates. `from` is the starting position.
  const drag = (id, from, e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    focus(id);
    const start = { px: e.clientX, py: e.clientY };
    const move = (ev) => {
      setPos((p) => ({
        ...p,
        [id]: {
          x: Math.max(-40 - ox, from.x + (ev.clientX - start.px) / scale),
          y: Math.max(-oy, from.y + (ev.clientY - start.py) / scale),
        },
      }));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // The sticky note starts pinned to the bottom-left corner; its first drag
  // converts that to a position like the windows use.
  const dragNote = (e) => {
    const el = noteRef.current;
    const from = pos.note || { x: el.offsetLeft - ox, y: el.offsetTop - oy };
    drag('note', from, e);
  };

  // Wraps a window: positioning, z-order, and a drag handle over the title bar.
  const Frame = (id, handleLeft, children) =>
    open.includes(id) ? (
      <div
        key={id}
        onPointerDown={() => focus(id)}
        style={{ position: 'absolute', left: 0, top: 0, zIndex: zs[id] || 10, transform: `translate(${Math.round(pos[id].x + ox)}px, ${Math.round(pos[id].y + oy)}px)` }}
      >
        <div style={{ position: 'relative' }}>
          {children}
          <div onPointerDown={(e) => drag(id, pos[id], e)} style={{ position: 'absolute', top: 0, left: handleLeft, right: 48, height: 30, cursor: 'move', touchAction: 'none' }} />
        </div>
      </div>
    ) : null;

  const current = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];
  const menuItems = APPS.map((a) => ({ label: a.label, onClick: () => launch(a.id) }));
  const notePos = pos.note
    ? { left: 0, top: 0, transform: `translate(${Math.round(pos.note.x + ox)}px, ${Math.round(pos.note.y + oy)}px)` }
    : { left: 0, bottom: 20 };

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--ink-1000)' }}>
      <div
        style={{
          position: 'relative',
          width: W,
          height: H,
          // `zoom` (not transform: scale) so text is re-rendered at the real size and stays crisp.
          zoom: scale,
          overflow: 'hidden',
          background: 'var(--surface-desktop)',
          backgroundImage: 'var(--bg-grid)',
          backgroundSize: 'var(--grid-size) var(--grid-size)',
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuBar logo="terminal" items={menuItems} title={open.length ? 'C:\\ANA\\portfolio' : OS_NAME} right={formatClock(now)} />

        <main style={{ position: 'relative', flex: 1, minHeight: 0 }}>
          <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', margin: 0 }}>
            Ana Garcia — Software Engineer portfolio
          </h1>

          <div style={{ position: 'absolute', top: 16, left: 0, display: 'grid', gap: 6, zIndex: 2 }}>
            <DesktopIcon icon="user-round" label="about me" selected={active === 'about'} onOpen={() => launch('about')} />
            <DesktopIcon icon="folder" label="projects" selected={active === 'works'} onOpen={() => launch('works')} />
            <DesktopIcon icon="sliders-horizontal" label="skills" selected={active === 'system'} onOpen={() => launch('system')} />
            <DesktopIcon icon="file-text" label="resume" selected={active === 'resume'} onOpen={() => launch('resume')} />
          </div>

          <div style={{ position: 'absolute', top: 16, right: 0, display: 'grid', gap: 6, zIndex: 2 }}>
            <DesktopIcon icon="mail" label="contact me" selected={active === 'mail'} onOpen={() => launch('mail')} />
            <DesktopIcon icon="git-branch" label="github" href={PROFILE.github} />
            <DesktopIcon icon="briefcase" label="linkedin" href={PROFILE.linkedin} />
            <DesktopIcon icon="download" label="resume.pdf" href={resumePdf} download="AnaGarciaResume.pdf" />
          </div>

          <div
            ref={noteRef}
            onPointerDown={dragNote}
            style={{ position: 'absolute', zIndex: zs.note || 3, cursor: 'move', touchAction: 'none', userSelect: 'none', ...notePos }}
          >
            <Panel tone="paper" style={{ width: 240, font: 'var(--type-code)', lineHeight: 1.55 }}>
              <div style={{ ...labelStyle, marginBottom: 8 }}>NOTE TO SELF</div>
              Still building Talkie.<br />Shipping NailzByDardo.<br />The links are real.<br />The desktop is not.
            </Panel>
          </div>

          {Frame('about', 48,
            <Window title="C:\ANA\readme.txt" controls="dots" surface="paper" chrome="olive" width={490} onClose={() => close('about')}>
              <div style={{ display: 'flex', gap: 18, padding: 22 }}>
                <img
                  src={pfp}
                  alt="Ana Garcia"
                  style={{ display: 'block', width: 118, height: 118, flex: '0 0 auto', objectFit: 'cover', border: '2px solid var(--line-hard)', borderRadius: 2, boxShadow: '2px 2px 0 var(--line-hard)', filter: 'saturate(0.85) contrast(1.02)' }}
                />
                <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ font: 'var(--type-h3)', letterSpacing: 'var(--ls-tight)' }}>{PROFILE.name}</div>
                    <div style={{ ...labelStyle, color: 'var(--text-on-paper-muted)', marginTop: 4 }}>{PROFILE.title}</div>
                  </div>
                  <p style={{ margin: 0, font: 'var(--type-body-sm)', maxWidth: '44ch' }}>{PROFILE.bio}</p>
                </div>
              </div>
              <div style={{ padding: '0 22px 22px' }}>
                <ContactRows labelWidth={84} />
              </div>
            </Window>,
          )}

          {Frame('works', 48,
            <Window title="C:\ANA\projects" controls="dots" chrome="olive" width={740} onClose={() => close('works')}>
              <div style={{ display: 'flex', minHeight: 0 }}>
                <div style={{ width: 200, flex: '0 0 auto', background: 'var(--surface-inset)', borderRight: '2px solid var(--line-hard)', padding: '8px 0' }}>
                  {PROJECTS.map((p) => {
                    const sel = p.id === current.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        className={sel ? undefined : 'nos-row'}
                        aria-pressed={sel}
                        onClick={() => setProjectId(p.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 10px',
                          background: sel ? 'var(--surface-control)' : 'transparent', border: 0,
                          borderLeft: `3px solid ${sel ? 'var(--amber-500)' : 'transparent'}`,
                          color: sel ? 'var(--text-body)' : 'var(--text-muted)', font: 'var(--type-menu)', textAlign: 'left', cursor: 'pointer',
                        }}
                      >
                        <Icon name="file-code" size={14} aria-hidden="true" />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.file}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ flex: '1 1 auto', minWidth: 0, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <img
                      src={current.image}
                      alt=""
                      style={{ display: 'block', width: 104, height: 104, flex: '0 0 auto', objectFit: 'cover', border: '2px solid var(--line-hard)', borderRadius: 2, boxShadow: '2px 2px 0 var(--line-hard)', filter: 'saturate(0.8)' }}
                    />
                    <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                        <h2 style={{ margin: 0, font: 'var(--type-h3)', letterSpacing: 'var(--ls-tight)', color: 'var(--text-body)' }}>{current.name}</h2>
                        <span style={{ ...labelStyle, color: 'var(--text-dim)' }}>{current.when}</span>
                      </div>
                      <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--text-muted)', maxWidth: '46ch' }}>{current.about}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {current.bullets.map((b) => (
                      <div key={b} style={{ display: 'flex', gap: 8, font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                        <span style={{ color: 'var(--amber-500)', flex: '0 0 auto' }}>›</span>
                        <span style={{ maxWidth: '60ch' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                    {current.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {current.links.map((l) => (
                      <Button key={l.label} variant="secondary" size="sm" icon={l.icon} href={l.href}>{l.label}</Button>
                    ))}
                  </div>
                </div>
              </div>
              <StatusBar left={`${PROJECTS.length} ITEMS`} right={current.file} />
            </Window>,
          )}

          {Frame('system', 8,
            <Window title="skills.monitor" controls="close" chrome="ink" width={390} onClose={() => close('system')}>
              <div className="nos-scroll" style={{ padding: 16, display: 'grid', gap: 10, maxHeight: 470, overflow: 'auto' }}>
                <SkillPanels />
              </div>
              <StatusBar left="B.S. COMPUTER SCIENCE" right="GPA 3.96" />
            </Window>,
          )}

          {Frame('resume', 48,
            <Window title="C:\ANA\resume.pdf" controls="dots" surface="paper" chrome="bone" width={640} onClose={() => close('resume')}>
              <div className="nos-scroll" style={{ padding: '24px 28px', display: 'grid', gap: 18, height: 560, overflow: 'auto' }}>
                <ResumeBody />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: 'var(--bone-200)', borderTop: '2px solid var(--line-hard)' }}>
                <span style={{ ...labelStyle, color: 'var(--text-on-paper-muted)' }}>1 PAGE · PDF</span>
                <span style={{ display: 'flex', gap: 8 }}>
                  <Button variant="secondary" size="sm" icon="external-link" href={resumePdf}>Open</Button>
                  <Button variant="primary" size="sm" icon="download" href={resumePdf} download="AnaGarciaResume.pdf">Download</Button>
                </span>
              </div>
            </Window>,
          )}

          {Frame('mail', 8,
            <Window title="contact me" controls="close" chrome="olive" width={430} onClose={() => close('mail')}>
              <div style={{ padding: 16 }}>
                <ContactForm form={form} onCancel={() => close('mail')} />
              </div>
              <StatusBar left="9600 BAUD" right={form.statusLabel} />
            </Window>,
          )}
        </main>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, flex: '0 0 auto' }}>
          <Dock items={APPS} activeId={active} onSelect={launch} />
        </div>
      </div>
    </div>
  );
}
