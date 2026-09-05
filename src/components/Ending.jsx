import { useEffect, useState } from 'react'
import { PhotoFrame } from './PhotoFrame'

const LETTER = [
  'Bee Bee,',
  'I’m sorry that I haven’t been taking care of you the way you deserve. I know there were times when I was too focused on gaming and didn’t give you the attention, love, and care that I should have. Looking back, I realize that I made you feel less important than something that should never come before you, and I’m truly sorry for that.',
  'You mean so much more to me than any game, any win, or anything on a screen. You are the person I want beside me throughout my life, through the happy days, the difficult days, and everything in between. I don’t want to just tell you that I love you—I want to show it through the way I treat you, listen to you, spend time with you, and take care of you.',
  'I know saying “I’m sorry” alone cannot change what happened. I want to become better for us. I will make more time for you, pay more attention to your feelings, and make sure you never feel like you have to compete with a game for my attention. Of course I’ll still have things I enjoy doing, but I never want them to make me forget what is truly important to me.',
  'I want to love you more deeply as we continue our journey together. I want to be there when you’re happy, comfort you when you’re sad, support you when things are difficult, and celebrate every little moment with you. I want us to keep growing together, learning about each other, forgiving each other, and building beautiful memories along the way.',
  'Thank you for loving me, being patient with me, and staying beside me even when I haven’t been the best version of myself. I never want to take your love for granted.',
  'I love you so much, and I promise I will try harder to take care of your heart, because having you in my life is something I never want to lose.',
  'I’m sorry, my love. I love you, and I want to keep choosing you throughout our whole journey together.',
]

export function Ending({ couple, onBack }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= LETTER.length + 1) return undefined
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 350 : 900)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <div className="screen">
      <div className="letter">
        <div className="ending-photos">
          <PhotoFrame src={couple.youPhoto} alt={couple.youName} size={110} />
          {couple.togetherPhoto ? (
            <PhotoFrame
              className="together"
              src={couple.togetherPhoto}
              alt="us"
              size={148}
            />
          ) : null}
          <PhotoFrame src={couple.herPhoto} alt={couple.herName} size={110} />
        </div>
        {LETTER.slice(0, shown).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {shown > LETTER.length ? (
          <>
            <p className="signoff">
              Always yours,
              <br />
              Khant Khant
            </p>
            <div className="actions">
              <button type="button" className="btn honey" onClick={onBack}>
                play again
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
