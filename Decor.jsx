// 纯装饰性的构成元素：边角注册标记、斜线、竖向刻度线、幽灵大数字。
// 全部 aria-hidden，不承载内容，只用来制造版面的"构成感"。

export function CornerMarks({ className = '', inset = 24 }) {
  return (
    <div className={`decor-corners ${className}`} style={{ inset }} aria-hidden="true">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
    </div>
  )
}

export function DiagonalLine({ className = '', style }) {
  return <span className={`decor-diagonal ${className}`} style={style} aria-hidden="true" />
}

export function VerticalRule({ label, className = '', style }) {
  return (
    <div className={`decor-vrule ${className}`} style={style} aria-hidden="true">
      <span className="decor-vrule-line" />
      {label && <span className="decor-vrule-label">{label}</span>}
    </div>
  )
}

export function GhostNumber({ children, className = '', style }) {
  return (
    <span className={`decor-ghost ${className}`} style={style} aria-hidden="true">
      {children}
    </span>
  )
}
