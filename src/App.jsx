import { useEffect, useState } from 'react'
import './App.css'

const LETTER = [
  'I’m extremely angry and hurt that you chose not to stay beside me during my exams, especially when I needed your support the most.',
  'I honestly don’t want to see you or talk to you. I hate how this made me feel, and I hate that I expected you to be there for me and ended up feeling alone instead.',
  'Please stay away from me. Don’t come looking for me, don’t try to act like everything is normal.',
]

function Dust() {
  const motes = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: `${(i * 29) % 100}%`,
    delay: `${(i * 0.53) % 14}s`,
    duration: `${16 + (i % 11)}s`,
    size: `${4 + (i % 9)}px`,
  }))

  return (
    <div className="dust" aria-hidden="true">
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="mote"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            width: mote.size,
            height: mote.size,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= LETTER.length) return undefined
    const wait = shown === 0 ? 900 : 2400
    const timer = setTimeout(() => setShown((n) => n + 1), wait)
    return () => clearTimeout(timer)
  }, [shown])

  return (
    <>
      <div className="void-bg" />
      <div className="blood-drip" aria-hidden="true" />
      <div className="vignette" />
      <div className="scanlines" />
      <Dust />
      <main className="screen">
        <article className="curse">
          <p className="omen">you should not be here</p>
          <h1 className="glitch" data-text="Stay away.">
            Stay away.
          </h1>
          {LETTER.slice(0, shown).map((line, index) => (
            <p
              key={line}
              className={index === LETTER.length - 1 ? 'bleed-in final' : 'bleed-in'}
            >
              {line}
            </p>
          ))}
        </article>
      </main>
    </>
  )
}
