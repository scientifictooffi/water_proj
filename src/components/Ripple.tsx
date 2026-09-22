import { useState, type MouseEvent, type ReactNode } from 'react'

export function RippleButton({ children, onClick, className = '', disabled }: { children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const handle = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 650)
    onClick?.()
  }
  return (
    <button disabled={disabled} onClick={handle} className={`relative overflow-hidden ${className}`}>
      {ripples.map((r) => <span key={r.id} className="ripple h-10 w-10" style={{ left: r.x - 20, top: r.y - 20 }} />)}
      {children}
    </button>
  )
}
