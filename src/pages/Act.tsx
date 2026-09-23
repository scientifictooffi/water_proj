import { useEffect, useState } from 'react'
import { habits, organizations, challenge } from '../data/actions'

function load<T>(k: string, d: T): T { try { return JSON.parse(localStorage.getItem(k) ?? '') as T } catch { return d } }

export function Act() {
  const [on, setOn] = useState<string[]>(() => load('kaplya:habits', []))
  const [done, setDone] = useState<number[]>(() => load('kaplya:challenge', []))
  useEffect(() => { try { localStorage.setItem('kaplya:habits', JSON.stringify(on)) } catch { /* noop */ } }, [on])
  useEffect(() => { try { localStorage.setItem('kaplya:challenge', JSON.stringify(done)) } catch { /* noop */ } }, [done])
  const save = habits.filter((h) => on.includes(h.id)).reduce((a, b) => a + b.saveLitersPerDay, 0)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-extrabold md:text-4xl">Как помочь</h1>
      <p className="mt-3 max-w-2xl text-aqua/80">Три уровня: дом, сообщество, мир. Начни с того, что под рукой.</p>

      <h2 className="mt-12 text-2xl font-bold">Дома: калькулятор привычек</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {habits.map((h) => {
          const a = on.includes(h.id)
          return (
            <button key={h.id} onClick={() => setOn(a ? on.filter((x) => x !== h.id) : [...on, h.id])} className={`flex items-center justify-between rounded-xl px-5 py-4 text-left transition ${a ? 'bg-teal text-deep' : 'glass hover:bg-white/10'}`}>
              <span className="font-semibold">{a ? '✓ ' : ''}{h.label}</span>
              <span className={`text-sm ${a ? 'text-deep/70' : 'text-aqua/60'}`}>~{h.saveLitersPerDay} л/день</span>
            </button>
          )
        })}
      </div>
      <div className="glass mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-aqua/60">Экономия</div>
          <div className="font-display text-4xl font-extrabold text-teal">{save.toLocaleString('ru')} л/день</div>
        </div>
        <div className="text-sm text-aqua/80">За год: <b>{(save * 365).toLocaleString('ru')} л</b>. Это {Math.round((save * 365) / 10).toLocaleString('ru')} «игровых» дней для одного человека.</div>
      </div>

      <h2 className="mt-14 text-2xl font-bold">Челлендж на 7 дней</h2>
      <ol className="mt-4 space-y-2">
        {challenge.map((c, i) => {
          const d = done.includes(i)
          return (
            <li key={i}>
              <button onClick={() => setDone(d ? done.filter((x) => x !== i) : [...done, i])} className={`glass flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left ${d ? 'opacity-60 line-through' : 'hover:bg-white/10'}`}>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal">{d ? '✓' : i + 1}</span>
                <span>{c}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <p className="mt-2 text-xs text-aqua/50">Выполнено {done.length} из {challenge.length}. Прогресс сохраняется в браузере.</p>

      <h2 className="mt-14 text-2xl font-bold">Организации, которым можно доверять</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {organizations.map((o) => (
          <a key={o.name} href={o.url} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 transition hover:border-teal/60 hover:bg-white/10">
            <h3 className="font-bold text-teal">{o.name} ↗</h3>
            <p className="mt-1 text-sm text-aqua/80">{o.desc}</p>
          </a>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">Для учителей и волонтёров</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-aqua/90">
        <li>Проведите игру «Один день» в классе: разделите учеников на трёх персонажей и сравните концовки.</li>
        <li>Обсудите: почему 10 литров не хватает, если ВОЗ называет минимумом 50?</li>
        <li>Домашнее задание: посчитать водный след своего обеда на странице «Проблема».</li>
        <li>Локальный контекст: история Аральского моря и график подачи воды в вашем городе.</li>
      </ul>
    </section>
  )
}
