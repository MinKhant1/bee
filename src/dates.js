export function startDate(isoDay) {
  const [year, month, day] = isoDay.split('-').map(Number)
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

export function ordinal(n) {
  const v = n % 100
  const suffix = ['th', 'st', 'nd', 'rd']
  return `${n}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]}`
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function splitDuration(ms) {
  const safe = Math.max(0, ms)
  const totalSeconds = Math.floor(safe / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)
  return { days, hours, minutes, seconds, totalDays: days }
}

function calendarTogether(start, now) {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += previousMonth.getDate()
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return { years, months, days, hours, minutes, seconds }
}

function nextMonthsaryDate(start, now) {
  const candidate = new Date(now.getFullYear(), now.getMonth(), start.getDate(), 0, 0, 0, 0)
  if (now.getDate() < start.getDate()) return candidate
  return new Date(now.getFullYear(), now.getMonth() + 1, start.getDate(), 0, 0, 0, 0)
}

function nextAnniversaryDate(start, now) {
  const thisYear = new Date(now.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0)
  if (now < thisYear) return thisYear
  return new Date(now.getFullYear() + 1, start.getMonth(), start.getDate(), 0, 0, 0, 0)
}

function totalCompletedMonths(start, now) {
  const together = calendarTogether(start, now)
  return together.years * 12 + together.months
}

export function getLoveTime(isoDay, now = new Date()) {
  const start = startDate(isoDay)
  const elapsed = Math.max(0, now.getTime() - start.getTime())
  const clock = splitDuration(elapsed)
  const together = calendarTogether(start, now)
  const completedMonths = totalCompletedMonths(start, now)
  const isStartAnniversaryMonth =
    now.getMonth() === start.getMonth() && now.getDate() === start.getDate()
  const isTodayStart = isStartAnniversaryMonth && now.getFullYear() === start.getFullYear()
  const isAnniversary = isStartAnniversaryMonth && now.getFullYear() > start.getFullYear()
  const isMonthsary = now.getDate() === start.getDate() && !isTodayStart
  const nextMonthsary = nextMonthsaryDate(start, now)
  const nextAnniversary = nextAnniversaryDate(start, now)

  return {
    start,
    clock,
    together,
    completedMonths,
    isTodayStart,
    isMonthsary,
    isAnniversary,
    nextMonthsary,
    nextAnniversary,
    untilMonthsary: splitDuration(nextMonthsary.getTime() - now.getTime()),
    untilAnniversary: splitDuration(nextAnniversary.getTime() - now.getTime()),
  }
}

export function monthsaryTimeline(isoDay, now = new Date()) {
  const start = startDate(isoDay)
  const completedMonths = totalCompletedMonths(start, now)
  const endMonth = Math.max(completedMonths + 2, 3)
  const items = [
    {
      key: 'start',
      date: start,
      title: 'The day we began',
      note: 'June 15, 2026',
      state: now >= start ? 'done' : 'soon',
    },
  ]

  for (let month = 1; month <= endMonth; month += 1) {
    const date = new Date(start.getFullYear(), start.getMonth() + month, start.getDate())
    const isAnniversary = month % 12 === 0
    const title = isAnniversary
      ? `${ordinal(month / 12)} anniversary`
      : `${ordinal(month)} monthsary`
    let state = 'soon'
    if (now.toDateString() === date.toDateString()) state = 'today'
    else if (now > date) state = 'done'
    items.push({
      key: `m-${month}`,
      date,
      title,
      note: date.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      state,
    })
  }

  return items
}

export function formatClock(part) {
  return pad(part)
}
