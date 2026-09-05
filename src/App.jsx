import { useState } from 'react'
import './App.css'
import { COUPLE } from './couple'
import { loadProgress, saveProgress } from './storage'
import { FloatingHearts } from './components/PhotoFrame'
import { TitleScreen } from './components/TitleScreen'
import { BeeGame } from './components/BeeGame'
import { MemoryGame } from './components/MemoryGame'
import { Ending } from './components/Ending'

export default function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [screen, setScreen] = useState('title')
  const couple = { ...COUPLE, ...progress }

  function persist(next) {
    setProgress(next)
    saveProgress(next)
  }

  const meadow = screen === 'garden' ? null : <div className="meadow-bg" />

  return (
    <>
      {meadow}
      <FloatingHearts />
      {screen === 'title' && (
        <TitleScreen couple={couple} onPlay={setScreen} />
      )}
      {screen === 'garden' && (
        <BeeGame
          couple={couple}
          onBack={() => setScreen('title')}
          onWin={() => {
            persist({ ...progress, gardenDone: true })
            setScreen('title')
          }}
        />
      )}
      {screen === 'memory' && (
        <MemoryGame
          couple={couple}
          onBack={() => setScreen('title')}
          onWin={() => {
            persist({ ...progress, memoryDone: true })
            setScreen('title')
          }}
        />
      )}
      {screen === 'ending' && (
        <Ending couple={couple} onBack={() => setScreen('title')} />
      )}
    </>
  )
}
