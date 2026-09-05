export function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 54S10 40 10 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 16-22 30-22 30z"
        fill="#e56b7d"
      />
      <path
        d="M20 24c0-6 4-10 9-10"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  )
}

export function HoneyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <path d="M18 22h28l-3 32H21z" fill="#f0b429" />
      <path d="M21 28h22l-2 22H23z" fill="#ffd56a" />
      <rect x="16" y="16" width="32" height="8" rx="3" fill="#d4920e" />
      <circle cx="32" cy="12" r="6" fill="#8fbf88" />
    </svg>
  )
}

export function BeeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <ellipse cx="20" cy="28" rx="10" ry="14" fill="#fff" opacity=".85" />
      <ellipse cx="44" cy="28" rx="10" ry="14" fill="#fff" opacity=".85" />
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="#f0b429" />
      <rect x="24" y="30" width="5" height="14" rx="2" fill="#5a3d32" />
      <rect x="35" y="30" width="5" height="14" rx="2" fill="#5a3d32" />
      <circle cx="26" cy="24" r="3" fill="#5a3d32" />
      <circle cx="38" cy="24" r="3" fill="#5a3d32" />
    </svg>
  )
}

export function BlossomIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="20" r="10" fill="#ff8fa3" />
      <circle cx="20" cy="32" r="10" fill="#ffc6c6" />
      <circle cx="44" cy="32" r="10" fill="#ffc6c6" />
      <circle cx="26" cy="44" r="10" fill="#ff8fa3" />
      <circle cx="38" cy="44" r="10" fill="#ff8fa3" />
      <circle cx="32" cy="33" r="8" fill="#f0b429" />
    </svg>
  )
}
