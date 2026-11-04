import { PageHead } from '../components/PageHead'
import { Icon } from '../components/Icon'
import { analyticsStats, categories, dynamics, periods } from '../data/analytics'
import { demoNote } from '../data/sources'

function Donut() {
  const r = 52, c = 2 * Math.PI * r
  const offs = categories.map((_, i) => categories.slice(0, i).reduce((a, k) => a + (k.pct / 100) * c, 0))
  return (
    <svg viewBox="0 0 140 140" className="h-44 w-44 shrink-0" role="img" aria-label="Сообщения по категориям">
      <g transform="rotate(-90 70 70)">
        {categories.map((k, i) => {
          const len = (k.pct / 100) * c
          const el = <circle key={k.name} cx="70" cy="70" r={r} fill="none" stroke={k.color} strokeWidth="18" strokeDasharray={`${len - 1.5} ${c - len + 1.5}`} strokeDashoffset={-offs[i]} />
          return el
        })}
      </g>
      <text x="70" y="70" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" className="num">2 841</text>
      <text x="70" y="86" textAnchor="middle" fill="#B9E7E8" fontSize="9">всего</text>
    </svg>
  )
}

function Line() {
  const W = 420, H = 190, pad = 34, max = 1000
  const pts = dynamics.map((d, i) => [pad + (i * (W - pad - 10)) / (dynamics.length - 1), H - 26 - (d.v / max) * (H - 40)] as const)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Динамика сообщений">
      {[0, 250, 500, 750, 1000].map((v) => {
        const y = H - 26 - (v / max) * (H - 40)
        return <g key={v}><line x1={pad} x2={W - 6} y1={y} y2={y} stroke="#fff" strokeOpacity=".08" /><text x={pad - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#B9E7E8" className="num">{v}</text></g>
      })}
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#19BFC0" strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="4" fill="#04222B" stroke="#19BFC0" strokeWidth="2" /><text x={x} y={H - 8} textAnchor="middle" fontSize="9" fill="#B9E7E8">{dynamics[i].m}</text></g>)}
    </svg>
  )
}

export function Analytics() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="frame">
      <PageHead title="Водная ситуация в Казахстане" text="Сообщения жителей, открытые данные и аналитика по регионам.">
        <p className="mt-4 inline-block rounded-xl bg-sand/15 px-4 py-2 text-sm text-sand">{demoNote}</p>
      </PageHead>
      <div className="mb-4 flex justify-end">
        <select className="field w-auto" aria-label="Период">{periods.map((p) => <option key={p}>{p}</option>)}</select>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {analyticsStats.map((s) => (
          <div key={s.label} className="glass flex items-center gap-4 rounded-2xl p-5">
            <Icon name={s.icon} className="h-8 w-8 shrink-0 text-teal" />
            <div><div className="num text-2xl font-semibold">{s.value}</div><div className="text-xs text-aqua/80">{s.label}</div></div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold">Сообщения по категориям</h2>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <Donut />
            <ul className="space-y-2 text-sm">
              {categories.map((k) => <li key={k.name} className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: k.color }} />{k.name} <span className="num ml-auto pl-4 text-aqua/70">{k.pct}%</span></li>)}
            </ul>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold">Динамика сообщений</h2>
          <div className="mt-4"><Line /></div>
        </div>
      </div>
      <p className="mt-6 text-xs text-aqua/60">Реальные показатели будут браться из открытых источников (Бюро национальной статистики, Казгидромет, платформа ЦУР) с указанием периода и методологии. Сообщения жителей не приравниваются к официальным результатам исследований.</p>
      </div>
    </section>
  )
}
