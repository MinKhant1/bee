import { useEffect, useRef, useState } from 'react'
import { chime } from '../chimes'

const NOTES = [
  'You make ordinary days glow.',
  'My favorite place is next to you.',
  'Bee mine. Always.',
  'Even my worries get quieter around you.',
  'Sweeter than honey, that’s you.',
  'I still get shy when you smile.',
  'Every version of the future has you in it.',
  'Thank you for being my home.',
  'I’d choose you in every meadow.',
  'Your laugh is my favorite sound.',
]

function HeartSvg() {
  return (
    <svg viewBox="0 0 64 64">
      <path
        d="M32 54S10 40 10 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 16-22 30-22 30z"
        fill="#e56b7d"
      />
      <path
        d="M20 24c0-6 4-10 9-10"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  )
}

export function BeeGame({ couple, onWin, onBack }) {
  const arenaRef = useRef(null)
  const beeRef = useRef({ x: 0.22, y: 0.58 })
  const pointerRef = useRef({ x: 0.22, y: 0.58 })
  const heartsRef = useRef([])
  const carriedRef = useRef(0)
  const scoreRef = useRef(0)
  const spawnRef = useRef(0)
  const idRef = useRef(1)
  const [, setTick] = useState(0)
  const [carried, setCarried] = useState(0)
  const [score, setScore] = useState(0)
  const [toast, setToast] = useState('')
  const [happy, setHappy] = useState(false)
  const [won, setWon] = useState(false)
  const [hint, setHint] = useState(true)
  const wonRef = useRef(false)
  const face = useRef(1)

  useEffect(() => {
    let raf
    let last = performance.now()

    const loop = (now) => {
      if (wonRef.current) return
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      const bee = beeRef.current
      const pointer = pointerRef.current
      bee.x += (pointer.x - bee.x) * Math.min(1, 8 * dt)
      bee.y += (pointer.y - bee.y) * Math.min(1, 8 * dt)
      const dx = pointer.x - bee.x
      if (Math.abs(dx) > 0.002) face.current = dx >= 0 ? 1 : -1

      spawnRef.current += dt
      if (spawnRef.current > 1.15 && heartsRef.current.length < 8) {
        spawnRef.current = 0
        const kind = Math.random()
        heartsRef.current.push({
          id: idRef.current++,
          x: 0.1 + Math.random() * 0.55,
          y: -0.06,
          vy: 0.07 + Math.random() * 0.06,
          wobble: Math.random() * Math.PI * 2,
          photo: kind > 0.72 ? couple.youPhoto : kind > 0.48 ? couple.herPhoto : null,
        })
      }

      const arena = arenaRef.current
      const w = arena?.clientWidth || 800
      const h = arena?.clientHeight || 600
      const next = []
      for (const heart of heartsRef.current) {
        heart.wobble += dt * 3
        heart.y += heart.vy * dt * 1.8
        heart.x += Math.sin(heart.wobble) * 0.04 * dt
        const dist = Math.hypot((heart.x - bee.x) * w, (heart.y - bee.y) * h)
        if (dist < 48 && carriedRef.current < 3) {
          carriedRef.current += 1
          setCarried(carriedRef.current)
          chime('collect')
          continue
        }
        if (heart.y < 1.08) next.push(heart)
      }
      heartsRef.current = next

      const gf = { x: 0.82, y: 0.7 }
      const toHer = Math.hypot((bee.x - gf.x) * w, (bee.y - gf.y) * h)
      if (toHer < 78 && carriedRef.current > 0) {
        scoreRef.current += carriedRef.current
        carriedRef.current = 0
        setCarried(0)
        setScore(scoreRef.current)
        setHappy(true)
        setTimeout(() => setHappy(false), 500)
        const note = NOTES[(scoreRef.current - 1) % NOTES.length]
        setToast(note)
        chime('deliver')
        if (scoreRef.current >= 10) {
          wonRef.current = true
          setWon(true)
          chime('win')
          return
        }
      }

      setTick((n) => n + 1)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [couple.herPhoto, couple.youPhoto])

  function pointer(e) {
    const r = arenaRef.current.getBoundingClientRect()
    pointerRef.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    }
  }

  const bee = beeRef.current

  return (
    <div className="screen" style={{ padding: 12 }}>
      <div
        className="arena"
        ref={arenaRef}
        onPointerMove={
          won
            ? undefined
            : (e) => {
                setHint(false)
                pointer(e)
              }
        }
        onPointerDown={
          won
            ? undefined
            : (e) => {
                setHint(false)
                pointer(e)
              }
        }
      >
        <img className="arena-art" src="/meadow-bg.png" alt="" />
        <div className="hud">
          <button className="btn" onClick={onBack}>
            back
          </button>
          <div className="pill">
            ♡ {score}/10 for {couple.herName} · carry {carried}/3
          </div>
        </div>
        {heartsRef.current.map((heart) => (
          <div
            key={heart.id}
            className={`heart-token ${heart.photo ? 'photo' : ''}`}
            style={{ left: `${heart.x * 100}%`, top: `${heart.y * 100}%` }}
          >
            <HeartSvg />
            {heart.photo ? <img src={heart.photo} alt="" /> : null}
          </div>
        ))}
        <div
          className="bee"
          style={{
            left: `${bee.x * 100}%`,
            top: `${bee.y * 100}%`,
            transform: `translate(-50%, -50%) scaleX(${face.current})`,
          }}
        >
          <span className="wing left" />
          <span className="wing right" />
          <div className="bee-face">
            <img src={couple.youPhoto} alt={couple.youName} />
          </div>
          {carried > 0 ? <span className="carry">{carried}</span> : null}
        </div>
        <div className={`gf ${happy ? 'happy' : ''}`}>
          <img className="gf-flower" src="/sunflower.png" alt="" />
          <div className="gf-face">
            <img src={couple.herPhoto} alt={couple.herName} />
          </div>
          <div className="gf-sign">{couple.herName}</div>
        </div>
        {hint && !toast ? (
          <div className="toast">
            Move around, catch hearts, then fly to {couple.herName}
          </div>
        ) : null}
        {toast ? <div className="toast">{toast}</div> : null}
      </div>
      {won ? (
        <div
          className="overlay"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overlay-card">
            <p className="win-hearts">♡ ♡ ♡</p>
            <h2>She caught every heart</h2>
            <p>
              {couple.herName} is glowing, {couple.youName}. You brought her a whole garden.
            </p>
            <div className="actions">
              <button type="button" className="btn primary" onClick={onWin}>
                continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
