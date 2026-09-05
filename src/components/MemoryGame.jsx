import { useMemo, useState } from 'react'
import { BeeIcon, BlossomIcon, HeartIcon, HoneyIcon } from '../icons'
import { chime } from '../chimes'

function shuffle(list) {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function Face({ pair, couple }) {
  if (pair.id === 'you') return <img src={couple.youPhoto} alt={couple.youName} />
  if (pair.id === 'her') return <img src={couple.herPhoto} alt={couple.herName} />
  if (pair.id === 'us') {
    if (couple.togetherPhoto) return <img src={couple.togetherPhoto} alt="us" />
    return (
      <div className="split-us">
        <img src={couple.youPhoto} alt="" />
        <img src={couple.herPhoto} alt="" />
      </div>
    )
  }
  if (pair.id === 'bee') return <BeeIcon />
  if (pair.id === 'honey') return <HoneyIcon />
  if (pair.id === 'blossom') return <BlossomIcon />
  return <HeartIcon />
}

export function MemoryGame({ couple, onWin, onBack }) {
  const deck = useMemo(() => {
    const pairs = [
      { id: 'you' },
      { id: 'her' },
      { id: 'us' },
      { id: 'bee' },
      { id: 'honey' },
      { id: 'blossom' },
    ]
    return shuffle(
      pairs.flatMap((pair) => [
        { ...pair, key: `${pair.id}-a` },
        { ...pair, key: `${pair.id}-b` },
      ]),
    )
  }, [])

  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [lock, setLock] = useState(false)
  const won = matched.length === 12

  function flip(key, id) {
    if (lock || flipped.includes(key) || matched.includes(key)) return
    chime('flip')
    const next = [...flipped, key]
    const ids = [...flipped.map((k) => deck.find((c) => c.key === k).id), id]
    setFlipped(next)
    if (next.length === 2) {
      setLock(true)
      if (ids[0] === ids[1]) {
        chime('match')
        setTimeout(() => {
          const now = [...matched, ...next]
          setMatched(now)
          setFlipped([])
          setLock(false)
          if (now.length === 12) chime('win')
        }, 420)
      } else {
        setTimeout(() => {
          setFlipped([])
          setLock(false)
        }, 780)
      }
    }
  }

  return (
    <div className="screen">
      <div className="panel memory-wrap">
        <div className="hud" style={{ position: 'relative', marginBottom: 8 }}>
          <button className="btn" onClick={onBack}>
            back
          </button>
          <div className="pill">find us {matched.length / 2}/6</div>
        </div>
        <h1 className="title" style={{ fontSize: '2.2rem' }}>
          Memory Lane
        </h1>
        <p className="subtitle">Two of everything we love — including you two.</p>
        <div className="board">
          {deck.map((card) => {
            const isUp = flipped.includes(card.key) || matched.includes(card.key)
            return (
              <button
                key={card.key}
                className={`card ${isUp ? 'flipped' : ''} ${matched.includes(card.key) ? 'matched' : ''}`}
                onClick={() => flip(card.key, card.id)}
                aria-label="memory card"
              >
                <div className="card-inner">
                  <div className="card-face card-back">
                    <span>♡</span>
                  </div>
                  <div className="card-face card-front">
                    <Face pair={card} couple={couple} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {won ? (
        <div className="overlay">
          <div className="overlay-card">
            <p className="win-hearts">♡ ♡ ♡</p>
            <h2>We keep finding each other</h2>
            <p>Every pair was us, in a different little way.</p>
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
