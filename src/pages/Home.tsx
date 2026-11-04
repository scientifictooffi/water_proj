import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import { Carousel } from '../components/Carousel'
import { heroStats, features, journey, problemAreas, kazakhstanWaters } from '../data/home'
import { demoNote } from '../data/sources'

export function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-6">
        <div className="frame !p-0 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center brightness-125 saturate-150" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-deeper/50 via-transparent to-transparent" aria-hidden />
            <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
                <h1 className="text-4xl font-extrabold text-white drop-shadow-lg md:text-6xl">Вода — наше общее будущее.</h1>
                <p className="mt-5 max-w-lg text-lg text-white drop-shadow">Исследуй водные ресурсы Казахстана, узнай о проблемах, поделись наблюдениями и стань частью изменений.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/play" className="btn !bg-[#5EEAD4]"><Icon name="game" />Начать игру<Icon name="arrow" className="h-4 w-4" /></Link>
                  <Link to="/atlas" className="btn-ghost bg-deeper/40"><Icon name="map" />Открыть атлас</Link>
                </div>
              </motion.div>
              <div className="rounded-2xl border border-white/10 bg-deeper/70 p-5 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                  {heroStats.map((s) => (
                    <div key={s.label} className="flex items-center gap-4">
                      <Icon name={s.icon} className="h-8 w-8 text-[#5EEAD4]" />
                      <div><div className="num text-2xl font-semibold">{s.value}</div><div className="text-xs text-aqua/80">{s.label}</div></div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[11px] text-aqua/50">Демо-значения. {demoNote}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-deeper/80 p-3 md:grid-cols-3 lg:grid-cols-6">
            {features.map((f) => (
              <Link key={f.to} to={f.to} className="group rounded-xl p-3 text-center transition hover:bg-white/10">
                <Icon name={f.icon} className="mx-auto h-8 w-8 text-[#5EEAD4] transition group-hover:scale-110" />
                <div className="mt-2 text-sm font-bold">{f.title}</div>
                <div className="mt-1 text-xs text-aqua/70">{f.text}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14">
        <h2 className="text-2xl font-bold md:text-3xl">Миссия</h2>
        <p className="mt-3 max-w-3xl text-aqua/85">SU DAUYSY (Су дауысы — «Голос воды») объединяет людей, водные ресурсы, образование, реальные проблемы и общественные инициативы Казахстана. Это единый путь, а не набор отдельных разделов.</p>
        <ol className="mt-6 grid gap-3 md:grid-cols-5">
          {journey.map((j, i) => (
            <li key={j} className="glass rounded-2xl p-4">
              <span className="num text-sm text-teal">0{i + 1}</span>
              <div className="mt-1 font-semibold">{j}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-14">
        <h2 className="text-2xl font-bold md:text-3xl">Какие проблемы охватывает проект</h2>
        <p className="mt-3 max-w-3xl text-aqua/85">Водная повестка всей страны, а не только питьевая вода.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problemAreas.map((p, i) => (
            <motion.div key={p.title} className="glass rounded-2xl p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }} transition={{ delay: i * .06 }}>
              <h3 className="font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-aqua/80">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold md:text-3xl">Важные водные объекты Казахстана</h2>
          <Link to="/atlas" className="text-teal underline underline-offset-4">Открыть атлас</Link>
        </div>
        <div className="mt-6"><Carousel slides={kazakhstanWaters} /></div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16">
        <div className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
          <Icon name="shield" className="h-12 w-12 text-teal" />
          <div>
            <h2 className="text-xl font-bold">Проверенная информация</h2>
            <p className="mt-2 text-aqua/85">У каждого показателя указаны источник, дата и условия использования. Сообщения жителей проходят модерацию и отмечаются как наблюдения, а не как официальные заключения.</p>
          </div>
          <Link to="/about#sources" className="btn-ghost">Источники и достоверность</Link>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-extrabold">Готов проверить себя?</h2>
          <p className="mx-auto mt-3 max-w-xl text-aqua/80">Для четверти планеты день начинается с вопроса: на что потратить 10 литров. Проживи этот день.</p>
          <Link to="/play" className="btn mt-6 text-lg">Начать игру</Link>
        </div>
      </section>
    </>
  )
}
