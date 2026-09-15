import { useEffect, useState } from 'react'
import { PhotoFrame } from './PhotoFrame'
import { formatClock, getLoveTime, monthsaryTimeline, ordinal } from '../dates'

function Stat({ value, label }) {
  return (
    <div className="count-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

export function Monthsary({ couple, onBack }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  const time = getLoveTime(couple.startedOn, now)
  const timeline = monthsaryTimeline(couple.startedOn, now)
  const { together, clock } = time
  const headline = time.isAnniversary
    ? `Happy ${ordinal(together.years)} anniversary`
    : time.isMonthsary
      ? `Happy ${ordinal(time.completedMonths)} monthsary`
      : time.isTodayStart
        ? 'The day it all began'
        : 'Our days together'

  return (
    <div className="screen">
      <div className="panel celebrate-panel">
        <div className="hud" style={{ position: 'relative', marginBottom: 4 }}>
          <button type="button" className="btn" onClick={onBack}>
            back
          </button>
        </div>
        <p className="kicker">Khant Khant ♡ Bee Bee</p>
        <h1 className="title celebrate-title">{headline}</h1>
        <p className="subtitle">
          We started dating on June 15, 2026. Every 15th is ours — monthsaries now, anniversaries
          forever.
        </p>

        <div className="celebrate-hero">
          <PhotoFrame src={couple.togetherPhoto} alt="us" size={168} className="together" />
        </div>

        {(time.isMonthsary || time.isAnniversary) && (
          <p className="celebrate-banner">
            {time.isAnniversary
              ? `A whole year of choosing each other, Bee Bee.`
              : `${ordinal(time.completedMonths)} month of us. I’m still choosing you.`}
          </p>
        )}

        <div className="together-line">
          <span>
            {together.years > 0 ? `${together.years} year${together.years === 1 ? '' : 's'} ` : ''}
            {together.months} month{together.months === 1 ? '' : 's'}
            {together.days > 0
              ? ` ${together.days} day${together.days === 1 ? '' : 's'}`
              : ''}
          </span>
        </div>

        <div className="count-grid">
          <Stat value={clock.totalDays} label="days" />
          <Stat value={formatClock(clock.hours)} label="hours" />
          <Stat value={formatClock(clock.minutes)} label="minutes" />
          <Stat value={formatClock(clock.seconds)} label="seconds" />
        </div>

        <div className="countdown-row">
          <div className="countdown-card">
            <p className="countdown-kicker">Next monthsary</p>
            <h3>
              {time.nextMonthsary.toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <p>
              {time.untilMonthsary.days}d {formatClock(time.untilMonthsary.hours)}h{' '}
              {formatClock(time.untilMonthsary.minutes)}m {formatClock(time.untilMonthsary.seconds)}s
            </p>
          </div>
          <div className="countdown-card honey-card">
            <p className="countdown-kicker">Next anniversary</p>
            <h3>
              {time.nextAnniversary.toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h3>
            <p>
              {time.untilAnniversary.days}d {formatClock(time.untilAnniversary.hours)}h{' '}
              {formatClock(time.untilAnniversary.minutes)}m{' '}
              {formatClock(time.untilAnniversary.seconds)}s
            </p>
          </div>
        </div>

        <h2 className="timeline-title">Our 15ths</h2>
        <ol className="monthsary-timeline">
          {timeline.map((item) => (
            <li key={item.key} className={`tl ${item.state}`}>
              <span className="tl-dot" />
              <div>
                <strong>{item.title}</strong>
                <em>{item.note}</em>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
