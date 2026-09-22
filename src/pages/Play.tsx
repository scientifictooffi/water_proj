import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame, saveResult } from '../store/game'
import { characters, scenes, pickEnding } from '../data/scenario'
import { Canister } from '../components/Canister'
import { RippleButton } from '../components/Ripple'
import { dailyUse } from '../data/facts'

function Meter({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs uppercase tracking-wider text-aqua/70"><span>{icon} {label}</span><span>{value}</span></div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div className={`h-full ${color}`} animate={{ width: `${value}%` }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} />
      </div>
    </div>
  )
}

const order = ['morning', 'breakfast', 'hygiene', 'day', 'event', 'evening', 'night']

export function Play() {
  const { character, state, sceneId, log, steps, flash, start, choose, reset } = useGame()
  const scene = scenes[sceneId]
  const progress = Math.max(0, order.indexOf(sceneId)) / (order.length - 1)
  const ending = useMemo(() => (sceneId === 'night' ? pickEnding(state, log) : null), [sceneId, state, log])

  useEffect(() => {
    if (ending && character) saveResult({ character: character.name, ending: ending.title, water: state.water })
  }, [ending, character, state.water])

  if (!character) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-extrabold md:text-4xl">Один день. Десять литров.</h1>
        <p className="mt-3 max-w-2xl text-aqua/80">
          Выбери, чью жизнь прожить. У каждого одна канистра на сутки и три показателя: вода, здоровье, отношения с людьми. Каждое решение стоит литров. Концовка зависит от того, что останется.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {characters.map((c) => (
            <motion.button key={c.id} whileHover={{ y: -6 }} onClick={() => start(c)} className="glass rounded-2xl p-6 text-left transition hover:border-teal/60">
              <div className="text-5xl">{c.emoji}</div>
              <h3 className="mt-4 text-xl font-bold">{c.name}</h3>
              <p className="text-sm text-teal">{c.place}</p>
              <p className="mt-2 text-sm text-aqua/80">{c.desc}</p>
              <p className="mt-4 text-xs text-aqua/50">Монет на воду: {c.start.money}</p>
            </motion.button>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`mx-auto max-w-6xl px-4 py-8 ${flash === 'dry' ? 'dry' : ''}`}>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-sand via-teal to-deeper" animate={{ width: `${progress * 100}%` }} />
      </div>
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="glass flex flex-col items-center gap-6 rounded-2xl p-6 md:sticky md:top-20 md:self-start">
          <div className="text-center"><div className="text-4xl">{character.emoji}</div><div className="mt-1 text-sm font-semibold">{character.name}</div></div>
          <Canister liters={Math.max(0, state.water)} />
          <div className="w-full space-y-3">
            <Meter label="Здоровье" value={state.health} icon="❤️" color="bg-coral" />
            <Meter label="Люди" value={state.social} icon="👥" color="bg-aqua" />
            <div className="flex justify-between text-xs uppercase tracking-wider text-aqua/70"><span>🪙 Монеты</span><span>{state.money}</span></div>
          </div>
        </aside>

        <div>
          <AnimatePresence mode="wait">
            {!ending ? (
              <motion.div key={scene.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: .35 }}>
                <p className="font-display text-sm tracking-widest text-teal">{scene.time}</p>
                <h2 className="mt-1 text-3xl font-extrabold">{scene.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-aqua/90">{scene.text}</p>
                <div className="mt-8 grid gap-3">
                  {scene.choices.map((c) => {
                    const locked = c.requires ? !c.requires(state) : false
                    const overspend = state.water + c.effects.water < 0
                    return (
                      <RippleButton key={c.label} disabled={locked} onClick={() => choose(c)} className={`glass flex items-center justify-between rounded-xl px-5 py-4 text-left transition hover:border-teal/70 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 ${overspend ? 'border-sand/60' : ''}`}>
                        <span className="font-semibold">{c.label}</span>
                        <span className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs ${overspend ? 'bg-sand/30 text-sand' : 'bg-teal/20 text-aqua'}`}>{overspend ? 'не хватит' : c.hint ?? ''}</span>
                      </RippleButton>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="font-display text-sm tracking-widest text-teal">22:00 · итог дня</p>
                <h2 className={`mt-1 text-3xl font-extrabold ${ending.tone === 'bad' ? 'text-coral' : ending.tone === 'warn' ? 'text-sand' : 'text-teal'}`}>{ending.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-aqua/90">{ending.text}</p>

                <div className="glass mt-8 rounded-2xl p-5">
                  <h3 className="font-bold">Твой день в решениях</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {steps.map((s, i) => (
                      <li key={i} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                        <span><span className="text-teal">{scenes[s.sceneId].time}</span> {s.choice}</span>
                        <span className="shrink-0 text-aqua/60">{s.water === 0 ? '0 л' : `${s.water} л`}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass mt-6 rounded-2xl p-5">
                  <h3 className="font-bold">Для сравнения: обычный день</h3>
                  <div className="mt-3 space-y-2">
                    {dailyUse.map((d) => (
                      <div key={d.region} className="grid grid-cols-[1fr_2fr_50px] items-center gap-3 text-sm">
                        <span className="truncate">{d.region}</span>
                        <div className="h-3 rounded-full bg-white/5"><div className={`h-full rounded-full ${d.liters <= 15 ? 'bg-sand' : 'bg-teal'}`} style={{ width: `${(d.liters / 300) * 100}%` }} /></div>
                        <span className="text-right">{d.liters}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-aqua/60">Один 8-минутный душ дома тратит больше, чем твоя дневная канистра.</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={reset} className="rounded-full bg-teal px-6 py-3 font-semibold text-deep transition hover:scale-105">Прожить иначе</button>
                  <Link to="/problem" className="rounded-full border border-aqua/40 px-6 py-3 font-semibold hover:bg-white/10">Почему так живут 2 миллиарда людей</Link>
                  <Link to="/act" className="rounded-full border border-aqua/40 px-6 py-3 font-semibold hover:bg-white/10">Что я могу сделать</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
