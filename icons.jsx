// 手写的极简线性图标，统一 24x24 视窗，currentColor 描边，避免额外依赖。

export function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconYoutube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconPaypal(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M7 4h6.2c2.8 0 4.4 1.5 4 3.9-.5 3-2.7 4.6-5.8 4.6H9.3L8.2 19H5L7 4z" />
      <path d="M10.6 8.4h5.6c2.6 0 3.9 1.4 3.5 3.7-.4 2.7-2.4 4.2-5.3 4.2h-2" opacity="0.55" />
    </svg>
  )
}

export function IconXiaohongshu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M8 7.5v9M8 7.5c2.6 0 3.6 1.6 3.6 3.4S10.6 14 8 14" />
      <path d="M15 8v8M13.2 16l3.6-3.2-3.6-3.3" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </svg>
  )
}

// 天体符号：小型罗盘 / 星芒，用作分节标记，呼应参考图里的档案感符号
export function IconCompass(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" strokeWidth="0.8" />
      <path d="M12 8l1.6 2.9L16 12l-2.4 1.1L12 16l-1.6-2.9L8 12l2.4-1.1z" />
    </svg>
  )
}

export function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" {...props}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" strokeWidth="0.6" opacity="0.6" />
      <path d="M12 5l1.8 5.2L19 12l-5.2 1.8L12 19l-1.8-5.2L5 12l5.2-1.8z" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  )
}
