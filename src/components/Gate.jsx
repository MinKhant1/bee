import { useState } from 'react'

const GATE_KEY = 'bee-mine-gate-v1'

export function loadGate() {
  try {
    return sessionStorage.getItem(GATE_KEY) === 'yes'
  } catch {
    return false
  }
}

export function saveGate() {
  try {
    sessionStorage.setItem(GATE_KEY, 'yes')
  } catch {
    // sessionStorage can be blocked; still admit for this visit
  }
}

export function Gate({ couple, onAdmit }) {
  const [denied, setDenied] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  return (
    <div className="screen">
      <img className="deco-bee a" src="/bee-deco.png" alt="" />
      <img className="deco-bee b" src="/bee-deco.png" alt="" />
      <div key={shakeKey} className={`panel gate-panel ${denied ? 'denied' : ''}`}>
        <p className="kicker">one question first</p>
        {couple.herPhoto ? (
          <div className="gate-photo">
            <img src={couple.herPhoto} alt={couple.herName} />
          </div>
        ) : null}
        <h1 className="title gate-question">Are you sure you are my girlfriend?</h1>
        <p className="subtitle gate-copy">
          {denied
            ? `Hmm. This honey is only for Min Khant's Girlfriend. Try again if that is you.`
            : 'Only she gets to buzz around in here.'}
        </p>
        <div className="actions">
          <button
            className="btn primary"
            onClick={() => {
              saveGate()
              onAdmit()
            }}
          >
            Yes
          </button>
          <button
            className="btn"
            onClick={() => {
              setDenied(true)
              setShakeKey((n) => n + 1)
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
