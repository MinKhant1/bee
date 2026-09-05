const KEY = 'bee-mine-progress-v1'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { gardenDone: false, memoryDone: false }
    return { gardenDone: false, memoryDone: false, ...JSON.parse(raw) }
  } catch {
    return { gardenDone: false, memoryDone: false }
  }
}

export function saveProgress(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
