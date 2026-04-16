interface SvgIconProps {
  name: string
  className?: string
  size?: number
}

const icons: Record<string, (size: number) => JSX.Element> = {
  'crystal-ball': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 19h12" /><path d="M8 19v-1a4 4 0 0 1 8 0v1" />
      <circle cx="12" cy="10" r="6" /><path d="M12 7v2" /><path d="M10 9h2" />
      <path d="M9 13c.5.5 1.5.5 2 0s1.5-.5 2 0" />
    </svg>
  ),
  'star-burst': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 5.5L19 6l-4 4 4 4-5.5-1.5L12 18l-1.5-5.5L5 14l4-4-4-4 5.5 1.5L12 2z" />
    </svg>
  ),
  'crescent-moon': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  'sparkle': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  'eye-intuitive': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  'scroll': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h12v14H4z" /><path d="M16 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
      <path d="M4 18h12v2H4z" /><path d="M8 8h4M8 12h4" />
    </svg>
  ),
  'cards-stack': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="12" height="16" rx="2" /><rect x="8" y="6" width="12" height="16" rx="2" />
    </svg>
  ),
  'compass': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M16.24 7.76l-5.12 2.12-2.12 5.12 5.12-2.12 2.12-5.12z" />
    </svg>
  ),
  'warning': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  'suit-major': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4 2-7.5L2 9h7z" />
    </svg>
  ),
  'suit-wands': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" /><path d="M9 3h6" /><path d="M8 8l4-2 4 2" /><path d="M9 15l3 2 3-2" />
    </svg>
  ),
  'suit-cups': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8c0 5 3 9 7 9s7-4 7-9" /><path d="M5 8h14" /><path d="M12 17v3" /><path d="M8 20h8" />
    </svg>
  ),
  'suit-swords': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v14" /><path d="M5 7l7-4 7 4" /><path d="M9 17h6" /><path d="M8 21l4-4 4 4" />
    </svg>
  ),
  'suit-pentacles': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" /><path d="M12 4v16" /><path d="M4 12h16" />
      <path d="M6.93 6.93l10.14 10.14" /><path d="M17.07 6.93L6.93 17.07" />
    </svg>
  ),
  'user': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  'log-out': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  'edit': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  'check': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
}

function SvgIcon({ name, className, size = 24 }: SvgIconProps) {
  const renderIcon = icons[name]
  if (!renderIcon) return null
  return (
    <span className={`inline-flex items-center justify-center ${className || ''}`}>
      {renderIcon(size)}
    </span>
  )
}

export default SvgIcon
