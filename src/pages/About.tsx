import { targets } from '../data/facts'
import { loadResults } from '../store/game'

export function About() {
  const results = loadResults()
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold md:text-5xl">О проекте</h1>
      <p className="mt-3 max-w-2xl text-aqua/80">
        «Капля» — интерактивная новелла и справочник по Цели устойчивого развития 6: обеспечить наличие и рациональное использование водных ресурсов и санитарии для всех.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Задачи SDG 6</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {targets.map((t) => (
          <div key={t.id} className="glass flex gap-4 rounded-xl p-4">
            <span className="font-display text-xl font-extrabold text-teal">{t.id}</span>
            <span className="text-aqua/90">{t.text}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold">Откуда цифры в игре</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-aqua/90">
        <li>10 литров в день: нижняя граница «базового доступа» по классификации ВОЗ. Ниже начинаются риски для здоровья.</li>
        <li>50 литров: рекомендуемый ВОЗ минимум для удовлетворения базовых потребностей.</li>
        <li>Расход душа 8–10 л/мин и смыва 6–9 л: типичная сантехника без экономичных режимов.</li>
        <li>2 литра питья: усреднённая норма при жаре; в игре персонаж живёт при +38°.</li>
        <li>Стоимость воды у торговцев в 10–20 раз выше водопроводной: данные UN-Habitat по неформальным поселениям.</li>
      </ul>

      <h2 className="mt-12 text-2xl font-bold">Технологии</h2>
      <p className="mt-2 text-aqua/80">React, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand. Сценарий описан как граф данных и легко расширяется.</p>

      {results.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold">Твои прохождения</h2>
          <div className="mt-4 space-y-2 text-sm">
            {results.slice().reverse().map((r) => (
              <div key={r.at} className="glass flex flex-wrap justify-between gap-2 rounded-xl px-4 py-3">
                <span>{r.character}</span><span className="text-teal">{r.ending}</span><span className="text-aqua/60">осталось {r.water.toFixed(1)} л</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
