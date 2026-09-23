/*
 * Nocturne OS components — ported from the Claude Design export
 * (design-export/Nocturne OS Design System/components). Only the pieces the
 * portfolio uses are included. Changes from the originals:
 *  - Button and DesktopIcon accept `href` and render an <a> (no <button> inside <a>).
 *  - Pressable elements get the `nos-press` class for hover/press states (see index.css).
 *  - TextField/TextArea forward `name`, `required`, etc. so the form works with EmailJS.
 */

const ICON_CDN = 'https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/';

export function Icon({ name, size = 16, color = 'currentColor', title, style, ...rest }) {
  const url = `url("${ICON_CDN}${name}.svg")`;
  return (
    <span
      role="img"
      aria-label={title || name}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        background: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
      {...rest}
    />
  );
}

export function WindowControls({ variant = 'dots', onClose }) {
  if (variant === 'close') {
    return (
      <button
        type="button"
        onClick={onClose}
        aria-label="Close window"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 20,
          height: 20,
          background: 'var(--red-500)',
          border: 'var(--border-hard) solid var(--line-hard)',
          borderRadius: 'var(--radius-4)',
          color: 'var(--bone-100)',
          font: 'var(--type-label)',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        ✕
      </button>
    );
  }
  const dot = {
    width: 12,
    height: 12,
    padding: 0,
    borderRadius: 'var(--radius-full)',
    border: 'var(--border-hard) solid var(--line-hard)',
    background: 'var(--bone-100)',
  };
  return (
    <span style={{ display: 'flex', gap: 'var(--space-6)' }}>
      <button type="button" aria-label="Close window" onClick={onClose} style={{ ...dot, cursor: 'pointer' }} />
      <span style={dot} />
    </span>
  );
}

export function Window({ title, controls = 'dots', chrome = 'olive', surface = 'dark', width, onClose, children, style, ...rest }) {
  const barBg = chrome === 'ink' ? 'var(--surface-chrome-inactive)' : chrome === 'bone' ? 'var(--bone-200)' : 'var(--surface-chrome)';
  const barFg = chrome === 'bone' ? 'var(--text-on-paper)' : 'var(--text-on-chrome)';
  return (
    <section
      aria-label={title}
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        background: surface === 'paper' ? 'var(--surface-paper)' : 'var(--surface-window)',
        color: surface === 'paper' ? 'var(--text-on-paper)' : 'var(--text-body)',
        border: 'var(--border-hard) solid var(--line-hard)',
        borderRadius: 'var(--radius-window)',
        boxShadow: 'var(--shadow-window)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr 48px',
          alignItems: 'center',
          height: 'var(--size-titlebar)',
          padding: '0 var(--space-8)',
          background: barBg,
          color: barFg,
          borderBottom: 'var(--border-hard) solid var(--line-hard)',
        }}
      >
        <span>{controls === 'dots' ? <WindowControls variant="dots" onClose={onClose} /> : null}</span>
        <span style={{ font: 'var(--type-window-title)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {controls === 'close' ? <WindowControls variant="close" onClose={onClose} /> : null}
        </span>
      </header>
      <div style={{ flex: '1 1 auto', minHeight: 0 }}>{children}</div>
    </section>
  );
}

export function Panel({ tone = 'inset', children, style, ...rest }) {
  const tones = {
    inset: { background: 'var(--surface-inset)', color: 'var(--text-body)', boxShadow: 'var(--shadow-inset)' },
    raised: { background: 'var(--surface-window-raised)', color: 'var(--text-body)', boxShadow: 'var(--shadow-hard-sm)' },
    paper: { background: 'var(--surface-paper)', color: 'var(--text-on-paper)', boxShadow: 'var(--shadow-hard-sm)' },
  };
  return (
    <div
      style={{
        padding: 'var(--space-12)',
        border: 'var(--border-hard) solid var(--line-hard)',
        borderRadius: 'var(--radius-6)',
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Button({ variant = 'primary', size = 'md', icon, href, disabled, children, style, ...rest }) {
  const variants = {
    primary: { background: 'var(--amber-500)', color: 'var(--ink-1000)' },
    secondary: { background: 'var(--surface-control)', color: 'var(--text-body)' },
  };
  const sizes = {
    sm: { height: 'var(--size-control-sm)', padding: '0 var(--space-10)', fontSize: 'var(--fs-11)' },
    md: { height: 'var(--size-control-md)', padding: '0 var(--space-16)', fontSize: 'var(--fs-13)' },
  };
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-8)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--fw-bold)',
    letterSpacing: 'var(--ls-wide)',
    border: 'var(--border-hard) solid var(--line-hard)',
    borderRadius: 'var(--radius-control)',
    boxShadow: 'var(--shadow-hard-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...variants[variant],
    ...sizes[size],
    ...(disabled ? { background: 'var(--state-disabled-bg)', color: 'var(--state-disabled-fg)', boxShadow: 'none' } : null),
    ...style,
  };
  const content = (
    <>
      {icon ? <Icon name={icon} size={size === 'sm' ? 13 : 15} aria-hidden="true" /> : null}
      {children}
    </>
  );
  if (href) {
    return (
      <a className="nos-press" href={href} target={rest.download ? undefined : '_blank'} rel="noopener noreferrer" style={s} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className="nos-press" type="button" disabled={disabled} style={s} {...rest}>
      {content}
    </button>
  );
}

export function Tag({ children, style }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px var(--space-8)',
        font: 'var(--type-label)',
        letterSpacing: 'var(--ls-wide)',
        border: 'var(--border-hard) solid var(--line-hard)',
        borderRadius: 'var(--radius-2)',
        background: 'var(--surface-control)',
        color: 'var(--text-body)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const fieldLabel = { font: 'var(--type-label)', letterSpacing: 'var(--ls-caps)', color: 'var(--text-dim)' };
const fieldBox = {
  background: 'var(--surface-inset)',
  color: 'var(--text-body)',
  border: 'var(--border-hard) solid var(--line-hard)',
  borderRadius: 'var(--radius-control)',
  boxShadow: 'var(--shadow-inset)',
  font: 'var(--type-code)',
};

export function TextField({ label, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
      <span style={fieldLabel}>{label}</span>
      <input style={{ ...fieldBox, height: 'var(--size-control-md)', padding: '0 var(--space-10)', minWidth: 0 }} {...rest} />
    </label>
  );
}

export function TextArea({ label, rows = 4, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
      <span style={fieldLabel}>{label}</span>
      <textarea rows={rows} style={{ ...fieldBox, padding: '8px 10px', resize: 'none' }} {...rest} />
    </label>
  );
}

export function MenuBar({ items = [], title, right, logo = 'terminal' }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 'var(--space-16)',
        height: 'var(--size-menubar)',
        padding: '0 var(--space-10)',
        background: 'var(--surface-chrome)',
        color: 'var(--text-on-chrome)',
        border: 'var(--border-hard) solid var(--line-hard)',
        borderRadius: 'var(--radius-4)',
        font: 'var(--type-menu)',
        flex: '0 0 auto',
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
        <Icon name={logo} size={14} aria-hidden="true" />
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            onClick={it.onClick}
            style={{ font: 'var(--type-menu)', color: 'inherit', background: 'transparent', border: 0, padding: '3px var(--space-4)', borderRadius: 'var(--radius-2)', cursor: 'pointer' }}
          >
            {it.label}
          </button>
        ))}
      </nav>
      <div style={{ textAlign: 'center', opacity: 0.92, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', letterSpacing: 'var(--ls-wide)', whiteSpace: 'pre' }}>{right}</div>
    </div>
  );
}

export function StatusBar({ left, right }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-12)',
        height: 'var(--size-statusbar)',
        padding: '0 var(--space-8)',
        background: 'var(--surface-inset)',
        borderTop: 'var(--border-hard) solid var(--line-hard)',
        color: 'var(--text-muted)',
        font: 'var(--type-label)',
        letterSpacing: 'var(--ls-wide)',
      }}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function DesktopIcon({ icon = 'folder', label, selected = false, onOpen, href, download }) {
  const s = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-6)',
    width: 96,
    padding: 'var(--space-6) var(--space-4)',
    background: selected ? 'var(--state-selected)' : 'transparent',
    border: `var(--border-hard) solid ${selected ? 'var(--line-hard)' : 'transparent'}`,
    borderRadius: 'var(--radius-6)',
    color: 'var(--text-body)',
    font: 'var(--type-icon-label)',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
  };
  const content = (
    <>
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 'var(--size-desktop-icon)',
          height: 'var(--size-desktop-icon)',
          background: 'var(--surface-window-raised)',
          border: 'var(--border-hard) solid var(--line-hard)',
          borderRadius: 'var(--radius-icon)',
          boxShadow: 'var(--shadow-hard-sm)',
        }}
      >
        <Icon name={icon} size={24} color="var(--bone-100)" aria-hidden="true" />
      </span>
      <span style={{ lineHeight: 1.2 }}>{label}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} download={download} target={download ? undefined : '_blank'} rel="noopener noreferrer" style={s}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onOpen} style={s}>
      {content}
    </button>
  );
}

export function Dock({ items = [], activeId, onSelect }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--space-10)',
        padding: 'var(--space-8) var(--space-12)',
        background: 'var(--surface-dock)',
        backdropFilter: 'blur(var(--blur-overlay))',
        border: 'var(--border-hard) solid var(--line-hard)',
        borderBottom: 0,
        borderRadius: 'var(--radius-10) var(--radius-10) 0 0',
      }}
    >
      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <button
            key={it.id}
            type="button"
            title={it.label}
            aria-label={it.label}
            onClick={() => onSelect && onSelect(it.id)}
            className="nos-press"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 42,
              height: 42,
              background: active ? 'var(--olive-600)' : 'var(--surface-window-raised)',
              border: 'var(--border-hard) solid var(--line-hard)',
              borderRadius: 'var(--radius-icon)',
              boxShadow: active ? 'var(--shadow-hard-sm)' : 'none',
              cursor: 'pointer',
            }}
          >
            <Icon name={it.icon} size={20} color="var(--bone-100)" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
