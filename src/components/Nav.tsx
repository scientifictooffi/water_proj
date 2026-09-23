import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/play', label: 'Прожить день' },
  { to: '/problem', label: 'Проблема' },
  { to: '/media', label: 'Медиатека' },
  { to: '/act', label: 'Как помочь' },
  { to: '/about', label: 'О проекте' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <img src="/logo.png" alt="SU" className="h-10 w-auto object-contain" />
        </NavLink>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `rounded-full px-3 py-1.5 text-sm transition ${isActive ? 'bg-teal text-deep font-semibold' : 'hover:bg-white/10'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden rounded-lg p-2 hover:bg-white/10" onClick={() => setOpen(!open)} aria-label="Меню">☰</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-4 pb-3 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-3 py-2 ${isActive ? 'bg-teal text-deep font-semibold' : 'hover:bg-white/10'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
