import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from './Icon'
import { links } from '../data/nav'

const langs = ['KZ', 'RU', 'EN']

export function Nav() {
  const [open, setOpen] = useState(false)
  const cls = (isActive: boolean) => `flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition ${isActive ? 'bg-[#5EEAD4] font-bold text-deeper' : 'text-white/90 hover:bg-white/10'}`
  return (
    <header className="sticky top-0 z-50 border-b border-teal/30 bg-deeper">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-top opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-deeper via-deeper/60 to-deeper/30" aria-hidden />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-14 w-auto object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-2xl font-extrabold tracking-wide">SU DAUYSY</span>
            <span className="block text-[10px] uppercase tracking-[.25em] text-aqua/70">Голос воды Казахстана</span>
          </span>
        </NavLink>
        <p className="hidden max-w-xs flex-1 border-l border-white/20 pl-5 text-base font-medium leading-snug text-white md:block">Национальная цифровая экосистема<br />о водных ресурсах Казахстана</p>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-deeper/70 p-1 text-xs font-semibold" role="group" aria-label="Язык (демо)">
            {langs.map((l) => <span key={l} aria-current={l === 'RU'} className={`rounded-full px-3 py-1 ${l === 'RU' ? 'bg-[#5EEAD4] text-deeper' : 'text-white/80'}`}>{l}</span>)}
          </div>
          <button className="rounded-lg p-2 hover:bg-white/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Меню" aria-expanded={open}>☰</button>
        </div>
      </div>
      <nav className="relative hidden justify-center gap-1 border-t border-white/10 bg-deeper/80 px-4 py-2 lg:flex">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => cls(isActive)}><Icon name={l.icon} className="h-4 w-4" />{l.label}</NavLink>
        ))}
      </nav>
      {open && (
        <nav className="relative grid grid-cols-2 gap-1 bg-deeper/90 px-4 pb-3 lg:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => cls(isActive)}><Icon name={l.icon} className="h-4 w-4" />{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
