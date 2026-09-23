import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wave } from '../components/Wave'
import { Canister } from '../components/Canister'
import { dailyUse } from '../data/facts'
import { waterStates, hiddenWater, crisisCauses, kazakhstanWaters } from '../data/home'
import { Carousel } from '../components/Carousel'

const teasers = [
  { icon: '🚰', stat: '2,2 млрд', text: 'человек без безопасной питьевой воды дома' },
  { icon: '🚽', stat: '3,5 млрд', text: 'человек без безопасной санитарии' },
  { icon: '🌡️', stat: '90%', text: 'стихийных бедствий связаны с водой' },
]

function Cards({ items }: { items: { title: string; emoji: string; text: string }[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c, i) => (
        <motion.div key={c.title} className="glass rounded-2xl p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
          <div className="text-3xl">{c.emoji}</div>
          <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-aqua/80">{c.text}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-8 pt-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/40 via-deep/55 to-deep" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <p className="mb-3 text-sm uppercase tracking-[.3em] text-teal">Цель устойчивого развития 6</p>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Что, если бы у воды был <span className="text-teal">лимит</span>?</h1>
            <p className="mt-5 max-w-lg text-lg text-aqua/90">
              Вода — химическое соединение, состоящее из водорода и кислорода, которое является одним из основных компонентов живых организмов и природных экосистем.
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

      {/* ВОДА НА ЗЕМЛЕ */}
      <section className="bg-deeper px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Вода на Земле</h2>
          <p className="mt-3 max-w-3xl text-aqua/80">На Земле вода существует в трёх основных состояниях:</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {waterStates.map((s) => (
              <div key={s.title} className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="text-3xl">{s.emoji}</span>
                <div><h3 className="font-bold">{s.title}</h3><p className="mt-1 text-sm text-aqua/80">{s.text}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="glass rounded-2xl px-8 py-6 text-center">
              <div className="font-display text-5xl font-extrabold text-teal">71%</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-aqua/60">поверхности Земли покрыто водой</div>
            </div>
            <div className="space-y-3 text-aqua/85">
              <p>Однако большая часть мировых водных ресурсов приходится на солёную воду океанов и морей. Пресная вода составляет лишь небольшую часть общего объёма воды на планете, а значительная её доля находится в ледниках, снежном покрове и под землёй.</p>
              <p>Поэтому наличие воды на планете не означает, что безопасная и доступная пресная вода доступна каждому человеку. Вода существует в разных формах и выполняет разные функции.</p>
            </div>
          </div>
        </div>
      </section>

      {/* СКРЫТАЯ ВОДА */}
      <section className="bg-deeper px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Вода, которую мы не видим</h2>
          <p className="mt-3 max-w-3xl text-aqua/80">Большое количество воды требуется для производства вещей и продуктов, которыми мы пользуемся каждый день.</p>
          <Cards items={hiddenWater} />
          <p className="mt-6 max-w-3xl text-aqua/80">
            Это понятие связано с <Link to="/problem" className="text-teal underline decoration-teal/40 underline-offset-4 hover:decoration-teal">водным следом</Link>: показателем, который учитывает объём воды, использованный для производства товара или услуги.
          </p>
        </div>
      </section>

      <Wave flip color="#0B1F3A" />

      {/* ВОДНЫЙ КРИЗИС */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[.3em] text-teal">Водный кризис</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Почему доступ к воде становится проблемой?</h2>
          <div className="mt-4 max-w-3xl space-y-3 text-aqua/85">
            <p>Водный кризис — это ситуация, при которой доступность безопасной и достаточной воды не соответствует потребностям населения, экономики и окружающей среды.</p>
            <p>Причины водных проблем различаются в зависимости от региона, однако среди основных факторов можно выделить:</p>
          </div>
          <Cards items={crisisCauses} />
        </div>
      </section>

      {/* СТАТИСТИКА */}
      <section className="px-4 pb-16">
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

      {/* КАЗАХСТАН */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[.3em] text-teal">Глобальная проблема → Казахстан</p>
          <div className="mt-4 max-w-3xl space-y-3 text-aqua/85">
            <p>Проблема воды имеет глобальный характер, но её последствия проявляются по-разному в отдельных странах и регионах.</p>
            <p>Казахстан относится к странам, для которых вопросы водной безопасности имеют особое значение.</p>
            <p>На состояние водных ресурсов страны влияют климатические условия, распределение водных ресурсов между регионами, состояние инфраструктуры и трансграничный характер многих рек.</p>
          </div>
          <h2 className="mt-10 text-2xl font-bold md:text-3xl">Важные водные объекты Казахстана</h2>
          <div className="mt-6"><Carousel slides={kazakhstanWaters} /></div>
        </div>
      </section>

      <Wave />

      {/* РАСХОД ПО РЕГИОНАМ */}
      <section className="bg-deeper px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold md:text-3xl">Сколько воды уходит за день</h2>
          <p className="mt-2 text-aqua/70">Литров на человека в сутки. Обрати внимание на последнюю строку.</p>
          <div className="mt-6 space-y-3">
            {dailyUse.map((d) => (
              <div key={d.region} className="grid grid-cols-[180px_1fr_60px] items-center gap-3 text-sm md:grid-cols-[240px_1fr_70px]">
                <span className="truncate">{d.region}</span>
                <div className="h-5 overflow-hidden rounded-full bg-white/5">
                  <motion.div className={`h-full rounded-full ${d.liters <= 15 ? 'bg-sand' : 'bg-teal'}`} initial={{ width: 0 }} whileInView={{ width: `${(d.liters / 310) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
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
        <p className="mx-auto mt-3 max-w-xl text-aqua/70">Ты открываешь кран, и вода просто есть. Для четверти планеты день начинается с вопроса: на что потратить 10 литров. Проживи этот день.</p>
        <Link to="/play" className="mt-8 inline-block rounded-full bg-teal px-8 py-4 text-lg font-bold text-deep transition hover:scale-105">Начать игру</Link>
      </section>
    </>
  )
}
