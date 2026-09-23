import { useState } from 'react'
import { motion } from 'framer-motion'
import { sections, waterFootprint } from '../data/facts'

export function Problem() {
  const [active, setActive] = useState(sections[0].id)
  const [pick, setPick] = useState<string[]>([])
  const total = waterFootprint.filter((w) => pick.includes(w.item)).reduce((a, b) => a + b.liters, 0)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm uppercase tracking-[.3em] text-teal">Цель 6</p>
      <h1 className="mt-2 text-2xl font-extrabold md:text-4xl">Устойчивое развитие — чистая вода и санитария</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="space-y-3 text-aqua/85">
          <p>Устойчивое развитие — это подход к развитию общества, при котором удовлетворение потребностей людей сегодня не должно лишать будущие поколения возможности удовлетворять свои собственные потребности.</p>
          <p>В XX веке стало очевидно, что быстрый рост населения, промышленности и потребления оказывает значительное влияние на окружающую среду.</p>
          <p>В 1987 году Всемирная комиссия ООН по окружающей среде и развитию опубликовала доклад «Наше общее будущее», в котором устойчивое развитие было определено как развитие, удовлетворяющее потребности настоящего времени без ущерба для способности будущих поколений удовлетворять свои потребности.</p>
          <p>В 2015 году государства — члены ООН приняли Повестку дня в области устойчивого развития на период до 2030 года. Она включает 17 Целей устойчивого развития — Sustainable Development Goals (SDGs).</p>
        </div>
        <img src="/sdgs.png" alt="17 Целей устойчивого развития ООН" className="w-full rounded-2xl bg-white p-3" />
      </div>
      <h2 className="mt-16 text-2xl font-bold md:text-3xl">Проблема в цифрах</h2>

      <div className="mt-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === s.id ? 'bg-teal text-deep' : 'glass hover:bg-white/10'}`}>{s.title}</button>
        ))}
      </div>

      {sections.filter((s) => s.id === active).map((s) => (
        <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <p className="max-w-3xl text-lg text-aqua/90">{s.intro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {s.facts.map((f) => (
              <a key={f.stat + f.text} href={f.url} target="_blank" rel="noreferrer" className="glass group rounded-2xl p-6 transition hover:border-teal/60 hover:bg-white/10">
                <div className="font-display text-4xl font-extrabold text-teal">{f.stat}</div>
                <p className="mt-2 text-aqua/90">{f.text}</p>
                <p className="mt-4 text-xs text-aqua/50 group-hover:text-aqua/80">{f.source}, {f.year} ↗</p>
              </a>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="mt-16">
        <h2 className="text-2xl font-bold md:text-3xl">Водный след: скрытая вода в вещах</h2>
        <p className="mt-2 max-w-2xl text-aqua/70">Выбери, что ты потребил сегодня. Это «виртуальная вода», ушедшая на производство. Данные Water Footprint Network.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {waterFootprint.map((w) => {
            const on = pick.includes(w.item)
            return (
              <button key={w.item} onClick={() => setPick(on ? pick.filter((p) => p !== w.item) : [...pick, w.item])} className={`rounded-xl p-4 text-left transition ${on ? 'bg-teal text-deep' : 'glass hover:bg-white/10'}`}>
                <div className="text-sm font-semibold">{w.item}</div>
                <div className={`text-xs ${on ? 'text-deep/70' : 'text-aqua/60'}`}>{w.liters.toLocaleString('ru')} л</div>
              </button>
            )
          })}
        </div>
        <div className="glass mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-aqua/60">Итого скрытой воды</div>
            <div className="font-display text-4xl font-extrabold text-teal">{total.toLocaleString('ru')} л</div>
          </div>
          <div className="text-sm text-aqua/80">Это <b>{Math.round(total / 10).toLocaleString('ru')}</b> дней жизни с лимитом 10 литров из игры.</div>
        </div>
      </div>
    </section>
  )
}
