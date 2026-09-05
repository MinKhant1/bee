export function TitleScreen({ couple, onPlay }) {
  const love = (couple.gardenDone ? 50 : 0) + (couple.memoryDone ? 50 : 0)

  return (
    <div className="screen">
      <img className="deco-bee a" src="/bee-deco.png" alt="" />
      <img className="deco-bee b" src="/bee-deco.png" alt="" />
      <div className="panel">
        <p className="kicker">for {couple.herName}, with all my buzz</p>
        <h1 className="title">Bee Mine</h1>
        <p className="subtitle">A tiny game made out of us.</p>
        <div className="title-hearts">
          <div className="heart-photo">
            <img src={couple.youPhoto} alt={couple.youName} />
          </div>
          {couple.togetherPhoto ? (
            <div className="heart-photo her" style={{ width: 128, height: 128 }}>
              <img src={couple.togetherPhoto} alt="us" />
            </div>
          ) : null}
          <div className="heart-photo her">
            <img src={couple.herPhoto} alt={couple.herName} />
          </div>
        </div>
        <div className="love-meter" aria-label="love meter">
          <span style={{ width: `${love}%` }} />
        </div>
        <div className="menu-grid">
          <button className="menu-card" onClick={() => onPlay('garden')}>
            <span>🌻</span>
            <h3>Heart Garden</h3>
            <p>Fly your face-bee. Bring her hearts.</p>
          </button>
          <button className="menu-card" onClick={() => onPlay('memory')}>
            <span>📷</span>
            <h3>Memory Lane</h3>
            <p>Match our photos and little tokens.</p>
          </button>
          <button
            className={`menu-card ${love < 100 ? 'locked' : ''}`}
            onClick={() => love >= 100 && onPlay('ending')}
          >
            <span>💌</span>
            <h3>Love Letter</h3>
            <p>{love < 100 ? 'Play both games to open it.' : `A note for ${couple.herName}.`}</p>
          </button>
        </div>
      </div>
    </div>
  )
}
