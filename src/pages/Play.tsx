import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame, saveResult } from '../store/game'
import { characters, scenes, pickEnding } from '../data/scenario'
import { Canister } from '../components/Canister'
import { RippleButton } from '../components/Ripple'
import { dailyUse } from '../data/facts'
import { gameScenarios } from '../data/home'
import { Icon } from '../components/Icon'

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

const dayActions = [
  { title: 'Умыться', l: 2, icon: 'sink' },
  { title: 'Принять душ', l: 5, icon: 'shower' },
  { title: 'Приготовить еду', l: 2, icon: 'pot' },
  { title: 'Постирать', l: 6, icon: 'washer' },
]

const order = ['morning', 'breakfast', 'hygiene', 'day', 'event', 'evening', 'night']

export function Play() {
  const { character, state, sceneId, log, steps, flash, start, choose, reset } = useGame()
  const [scn, setScn] = useState(gameScenarios[0])
  const [pick, setPick] = useState(0)
  const [counts, setCounts] = useState([1, 0, 0, 0])
  const scene = scenes[sceneId]
  const progress = Math.max(0, order.indexOf(sceneId)) / (order.length - 1)
  const ending = useMemo(() => (sceneId === 'night' ? pickEnding(state, log) : null), [sceneId, state, log])

  useEffect(() => {
    if (ending && character) saveResult({ character: character.name, ending: ending.title, water: state.water })
  }, [ending, character, state.water])

  if (!character) {
    const ch = characters[pick]
    const used = dayActions.reduce((a, d, i) => a + d.l * counts[i], 0)
    const over = Math.max(0, used - scn.water)
    const score = over > 0 ? Math.max(0, 10 - Math.round(over * 2)) : Math.min(10, Math.round((used / scn.water) * 10))
    const verdict = over > 0 ? 'Лимит превышен!' : score >= 7 ? 'Отлично!' : 'Можно больше'
    const verdictText = over > 0 ? 'Запас закончится раньше, чем день.' : score >= 7 ? 'Ты рационально использовал(а) воду.' : 'Часть запаса осталась неиспользованной.'
    const R = 42, C = 2 * Math.PI * R
    return (
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="frame">
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div>
              <h1 className="text-3xl font-extrabold md:text-4xl">Прожить день</h1>
              <p className="mt-3 text-white/90">Сможешь ли ты рационально использовать ограниченный запас воды?</p>
              <h2 className="mt-6 font-bold">Выбери сценарий:</h2>
              <div className="mt-3 grid gap-2">
                {gameScenarios.map((g) => (
                  <button key={g.id} aria-pressed={scn.id === g.id} onClick={() => setScn(g)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left font-semibold transition ${scn.id === g.id ? 'border-transparent bg-[#5EEAD4] text-deeper' : 'border-white/10 bg-white/5 hover:border-teal/60'}`}>
                    <Icon name={g.icon} className="h-5 w-5" />
                    <span className="flex-1">{g.title}<span className="num ml-2 text-xs font-normal opacity-70">{g.water} л</span></span>
                    {scn.id === g.id && <Icon name="chevron" className="h-4 w-4" />}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-aqua/60">Сценарии — игровые модели, а не утверждение, что в этих местах одинаковые реальные условия. Сценарий меняет стартовый запас воды.</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-[1fr_200px]">
              <div className="min-w-0">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ocean/70 via-[#0b4a63] to-deeper">
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-2xl card-dark px-4 py-2 shadow-lg">
                    <Icon name="droplet" className="h-7 w-7 text-teal" />
                    <div className="text-xs leading-tight">Твой запас воды:<div className="text-lg font-extrabold">{scn.water} л / день</div></div>
                  </div>
                  <img src={ch.img} alt={ch.name} className="mx-auto h-64 w-auto object-contain pt-4 md:h-72" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {characters.map((c, i) => (
                      <button key={c.id} aria-label={c.name} aria-pressed={pick === i} onClick={() => setPick(i)} className={`h-12 w-12 overflow-hidden rounded-full border-2 bg-deeper/60 ${pick === i ? 'border-[#5EEAD4]' : 'border-white/20'}`}><img src={c.img} alt="" className="h-full w-full object-cover" /></button>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div><div className="font-bold">{ch.name}</div><div className="text-sm text-[#5EEAD4]">{ch.place}</div><p className="text-sm text-aqua/80">{ch.desc}</p></div>
                  <button onClick={() => start({ ...ch, start: { ...ch.start, water: scn.water } })} className="btn !bg-[#5EEAD4]">Начать игру<Icon name="arrow" className="h-4 w-4" /></button>
                </div>
                <p className="mt-4 text-xs text-aqua/70">Примерь распределение воды на день:</p>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {dayActions.map((d, i) => (
                    <div key={d.title} className="flex flex-col items-center justify-between rounded-xl card-dark p-3 text-center">
                      <div className="text-sm font-bold leading-tight">{d.title}</div>
                      <div className="num text-xs text-aqua/80">{d.l} л × {counts[i]}</div>
                      <Icon name={d.icon} className="my-2 h-8 w-8 text-ocean" />
                      <div className="flex gap-2">
                        <button aria-label={`Меньше: ${d.title}`} disabled={counts[i] === 0} onClick={() => setCounts(counts.map((c, j) => (j === i ? c - 1 : c)))} className="grid h-8 w-8 place-items-center rounded-full bg-ocean text-white disabled:opacity-30"><Icon name="minus" className="h-4 w-4" /></button>
                        <button aria-label={`Больше: ${d.title}`} onClick={() => setCounts(counts.map((c, j) => (j === i ? c + 1 : c)))} className="grid h-8 w-8 place-items-center rounded-full bg-teal text-deeper"><Icon name="plus" className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-deeper/70 p-4 text-center">
                <h3 className="font-bold">Твой результат</h3>
                <svg viewBox="0 0 100 100" className="mx-auto mt-3 h-28 w-28" role="img" aria-label={`Результат ${score} из 10`}>
                  <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="9" />
                  <circle cx="50" cy="50" r={R} fill="none" stroke={over > 0 ? '#EF725F' : '#5EEAD4'} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(score / 10) * C} ${C}`} transform="rotate(-90 50 50)" />
                  <text x="50" y="57" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800">{score}/10</text>
                </svg>
                <div className="mt-2 text-lg font-extrabold">{verdict}</div>
                <p className="mt-1 text-xs text-aqua/80">{verdictText} Использовано {Math.round(used * 10) / 10} из {scn.water} л.</p>
                <Link to="/community" className="btn-teal mt-4 w-full !px-3 text-sm">Узнать, как сэкономить ещё<Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`mx-auto max-w-[1400px] px-4 py-8 ${flash === 'dry' ? 'dry' : ''}`}>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-sand via-teal to-deeper" animate={{ width: `${progress * 100}%` }} />
      </div>
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="glass flex flex-col items-center gap-6 rounded-2xl p-6 md:sticky md:top-20 md:self-start">
          <div className="text-center"><img src={character.img} alt="" className="mx-auto h-24 w-24 object-contain" /><div className="mt-1 text-sm font-semibold">{character.name}</div></div>
          <Canister liters={Math.max(0, state.water)} max={Math.max(10, scn.water)} />
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
                  <Link to="/analytics" className="rounded-full border border-aqua/40 px-6 py-3 font-semibold hover:bg-white/10">Данные и аналитика</Link>
                  <Link to="/community" className="rounded-full border border-aqua/40 px-6 py-3 font-semibold hover:bg-white/10">Что я могу сделать</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
