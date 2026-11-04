import { useState } from 'react'
import { Icon } from '../components/Icon'
import { layers, objects, outline, type Layer } from '../data/atlas'
import { demoNote } from '../data/sources'

const X = (lon: number) => (lon - 46) * 14
const Y = (lat: number) => (55.5 - lat) * 14
const outlinePath = outline.map(([lo, la], i) => `${i ? 'L' : 'M'}${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join(' ') + 'Z'

export function Atlas() {
  const [on, setOn] = useState<Record<Layer, boolean>>(() => Object.fromEntries(layers.map((l) => [l.id, l.on])) as Record<Layer, boolean>)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState('aral')
  const color = (l: Layer) => layers.find((x) => x.id === l)!.color
  const visible = objects.filter((o) => on[o.layer] && o.name.toLowerCase().includes(q.trim().toLowerCase()))
  const cur = objects.find((o) => o.id === sel) ?? objects[0]

  const [zoom, setZoom] = useState(1)
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="frame grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside>
          <h1 className="text-3xl font-extrabold">Атлас воды Казахстана</h1>
          <p className="mt-2 text-sm text-aqua/80">Водные ресурсы, проблемы и инициативы по стране. Карта схематична; остальные отметки демонстрационные.</p>
          <div className="relative mt-4">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist/60" />
            <input className="w-full rounded-full card-dark py-2.5 pl-9 pr-4 text-sm placeholder:text-mist/50" placeholder="Поиск региона или объекта" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск" />
          </div>
          <h2 className="mt-5 text-sm font-bold">Показать на карте:</h2>
          <ul className="mt-3 space-y-2.5">
            {layers.map((l) => (
              <li key={l.id}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input type="checkbox" checked={on[l.id]} onChange={() => setOn({ ...on, [l.id]: !on[l.id] })} className="h-5 w-5 rounded" style={{ accentColor: '#5EEAD4' }} />
                  {l.label}
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-aqua/60">{demoNote}</p>
        </aside>
        <div className="relative min-w-0">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-deeper/60">
            <svg viewBox="-10 -10 620 230" className="w-full origin-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }} role="img" aria-label="Схематичная карта Казахстана">
              <defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#50D1CC" strokeOpacity=".08" /></pattern></defs>
              <rect x="-10" y="-10" width="620" height="230" fill="url(#grid)" />
              <path d={outlinePath} fill="#087E83" fillOpacity=".35" stroke="#50D1CC" strokeOpacity=".6" strokeWidth="1.5" strokeLinejoin="round" />
              <text x="300" y="105" textAnchor="middle" fill="#B9E7E8" fillOpacity=".35" fontSize="22" letterSpacing="8">КАЗАХСТАН</text>
              {visible.map((o) => (
                <g key={o.id} onClick={() => setSel(o.id)} className="cursor-pointer" tabIndex={0} role="button" aria-label={o.name} onKeyDown={(e) => { if (e.key === 'Enter') setSel(o.id) }}>
                  <path transform={`translate(${X(o.lon)} ${Y(o.lat)}) scale(${o.id === sel ? 1.35 : 1})`} d="M0 0C-7-8-8-12-8-16a8 8 0 0116 0c0 4-1 8-8 16z" fill={color(o.layer)} stroke="#fff" strokeWidth="1.5" />
                  <circle cx={X(o.lon)} cy={Y(o.lat) - (o.id === sel ? 21 : 16)} r="3" fill="#fff" />
                </g>
              ))}
            </svg>
            <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg card-dark shadow">
              <button aria-label="Приблизить" onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.2).toFixed(1)))} className="grid h-9 w-9 place-items-center hover:bg-slate-100"><Icon name="plus" className="h-4 w-4" /></button>
              <button aria-label="Отдалить" onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))} className="grid h-9 w-9 place-items-center border-t border-slate-200 hover:bg-slate-100"><Icon name="minus" className="h-4 w-4" /></button>
            </div>
          </div>
          <article className="mt-4 flex gap-4 rounded-2xl card-dark p-3 sm:ml-auto sm:max-w-xl">
            {cur.img ? <img src={cur.img} alt={cur.name} className="h-24 w-32 shrink-0 rounded-xl object-cover" /> : <div className="grid h-24 w-32 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ocean to-deep text-white"><Icon name="pin" className="h-8 w-8" /></div>}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold">{cur.name}</h2>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-orange-400 px-2 py-0.5 font-semibold text-white">{cur.tag}</span>
                <span className="rounded-md bg-white/10 px-2 py-0.5">{cur.status}</span>
                {cur.demo && <span className="rounded-md bg-coral/20 px-2 py-0.5 text-coral">демо</span>}
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-mist/80">{cur.text}</p>
            </div>
            <Icon name="chevron" className="h-5 w-5 shrink-0 self-center text-aqua" />
          </article>
          {visible.length === 0 && <p className="mt-4 text-aqua/70">Ничего не найдено. Измените поиск или включите слои.</p>}
        </div>
      </div>
    </section>
  )
}
