let ctx

function audio() {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, start, dur, type = 'sine', gain = 0.05) {
  const a = audio()
  const osc = a.createOscillator()
  const g = a.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(gain, a.currentTime + start)
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur)
  osc.connect(g)
  g.connect(a.destination)
  osc.start(a.currentTime + start)
  osc.stop(a.currentTime + start + dur + 0.02)
}

export function chime(kind) {
  try {
    if (kind === 'collect') {
      tone(784, 0, 0.12)
      tone(988, 0.06, 0.16)
    } else if (kind === 'deliver') {
      tone(523, 0, 0.14)
      tone(659, 0.08, 0.16)
      tone(784, 0.16, 0.22)
    } else if (kind === 'match') {
      tone(659, 0, 0.12)
      tone(831, 0.1, 0.2)
    } else if (kind === 'flip') {
      tone(440, 0, 0.08, 'triangle', 0.03)
    } else if (kind === 'win') {
      tone(523, 0, 0.18)
      tone(659, 0.12, 0.18)
      tone(784, 0.24, 0.18)
      tone(1046, 0.36, 0.4)
    } else if (kind === 'tap') {
      tone(698, 0, 0.09, 'sine', 0.03)
    }
  } catch {
    /* autoplay quirks */
  }
}
