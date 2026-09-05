export function PhotoFrame({ src, alt, size, shape = 'circle', className = '' }) {
  const style = size ? { width: size, height: size } : undefined
  return (
    <div className={`photo-frame ${shape} ${className}`} style={style}>
      {src ? <img src={src} alt={alt} /> : <span className="photo-empty">♡</span>}
    </div>
  )
}

export function FloatingHearts({ count = 14 }) {
  return (
    <div className="float-hearts" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: `${(i * 19 + 7) % 100}%`,
            animationDelay: `${(i % 8) * 0.8}s`,
            animationDuration: `${9 + (i % 5)}s`,
            fontSize: `${14 + (i % 4) * 7}px`,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  )
}
