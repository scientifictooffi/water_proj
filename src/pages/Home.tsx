import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wave } from '../components/Wave'
import { Canister } from '../components/Canister'
import { dailyUse } from '../data/facts'

const teasers = [
  { icon: '🚰', stat: '2,2 млрд', text: 'человек без безопасной питьевой воды дома' },
  { icon: '🚽', stat: '3,5 млрд', text: 'человек без безопасной санитарии' },
  { icon: '🌡️', stat: '90%', text: 'стихийных бедствий связаны с водой' },
]

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-8 pt-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,182,193,.25),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <p className="mb-3 text-sm uppercase tracking-[.3em] text-teal">Цель устойчивого развития 6</p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Что, если бы у воды был <span className="text-teal">лимит</span>?</h1>
            <p className="mt-5 max-w-lg text-lg text-aqua/80">
              Ты открываешь кран, и вода просто есть. Для четверти планеты день начинается с вопроса: на что потратить 10 литров. Проживи этот день.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/play" className="rounded-full bg-teal px-6 py-3 font-semibold text-deep shadow-lg shadow-teal/30 transition hover:scale-105">Прожить день →</Link>
              <Link to="/problem" className="rounded-full border border-aqua/40 px-6 py-3 font-semibold transition hover:bg-white/10">Узнать проблему</Link>
            </div>
          </motion.div>
          <motion.div className="flex justify-center" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .3, duration: .7 }}>
            <Canister liters={10} size={200} />
          </motion.div>
        </div>
      </section>
      <Wave />
      <section className="bg-deeper px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {teasers.map((t, i) => (
            <motion.div key={t.stat} className="glass rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
              <div className="text-3xl">{t.icon}</div>
              <div className="mt-3 font-display text-4xl font-extrabold text-teal">{t.stat}</div>
              <p className="mt-1 text-aqua/80">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-deeper px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Сколько воды уходит за день</h2>
          <p className="mt-2 text-aqua/70">Литров на человека в сутки. Обрати внимание на последнюю строку.</p>
          <div className="mt-6 space-y-3">
            {dailyUse.map((d) => (
              <div key={d.region} className="grid grid-cols-[180px_1fr_60px] items-center gap-3 text-sm md:grid-cols-[240px_1fr_70px]">
                <span className="truncate">{d.region}</span>
                <div className="h-5 overflow-hidden rounded-full bg-white/5">
                  <motion.div className={`h-full rounded-full ${d.liters <= 15 ? 'bg-sand' : 'bg-teal'}`} initial={{ width: 0 }} whileInView={{ width: `${(d.liters / 300) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
                </div>
                <span className="text-right font-semibold">{d.liters} л</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Wave flip color="#0B1F3A" />
      <section className="px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold">Готов проверить себя?</h2>
        <p className="mx-auto mt-3 max-w-xl text-aqua/70">Шесть решений, три персонажа, пять концовок. Ни одна из них не будет комфортной.</p>
        <Link to="/play" className="mt-8 inline-block rounded-full bg-teal px-8 py-4 text-lg font-bold text-deep transition hover:scale-105">Начать игру</Link>
      </section>
    </>
  )
}
