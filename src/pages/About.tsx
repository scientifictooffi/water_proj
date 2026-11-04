import { Icon } from '../components/Icon'
import { loadResults } from '../store/game'
import { sources, reliabilityLevels, transparencyText } from '../data/sources'

const pillars = [
  { icon: 'shield', title: 'Наша миссия', text: 'Сделать водные проблемы Казахстана видимыми и понятными.' },
  { icon: 'layers', title: 'Наш подход', text: 'Образование, данные, участие и действия: игра, атлас, мониторинг, аналитика.' },
  { icon: 'droplet', title: 'Наше видение', text: 'Устойчивый водный Казахстан для будущих поколений.' },
]

export function About() {
  const results = loadResults()
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10">
      <div className="frame grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="relative min-h-64 overflow-hidden rounded-2xl">
          <img src="/hero-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-150" />
          <div className="absolute inset-0 bg-gradient-to-t from-deeper/60 to-transparent" aria-hidden />
        </div>
        <div className="paper p-5 md:p-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">О проекте SU DAUYSY</h1>
          <p className="muted mt-3 text-sm">Национальная цифровая экосистема, которая объединяет знания, данные и людей для решения водных проблем Казахстана. «У воды есть голос. У каждого есть возможность его услышать».</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="text-center">
                <Icon name={p.icon} className="mx-auto h-9 w-9 text-[#0f9d9a]" />
                <h2 className="mt-2 font-bold">{p.title}</h2>
                <p className="muted mt-1 text-xs">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 id="sources" className="mt-14 scroll-mt-32 text-2xl font-bold">Источники данных и достоверность</h2>
      <p className="mt-3 max-w-3xl text-aqua/80">Не все государственные данные доступны для автоматической интеграции, и не все условия повторного использования одинаковы. Ниже источники, которые мы используем, что они дают и на каких условиях.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sources.map((s) => (
          <article key={s.id} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold"><a href={s.url} target="_blank" rel="noreferrer" className="hover:text-teal">{s.name}</a></h3>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${s.status === 'ok' ? 'bg-teal/20 text-teal' : 'bg-sand/20 text-sand'}`}>{s.status === 'ok' ? 'Подтверждено' : 'Нужна проверка'}</span>
            </div>
            <p className="mt-3 text-sm"><span className="text-aqua/60">Что даёт: </span>{s.gives}</p>
            <p className="mt-2 text-sm"><span className="text-aqua/60">Условия использования: </span>{s.reuse}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold">Достоверность данных, модерация и информационная прозрачность</h3>
          <div className="mt-3 space-y-3 text-sm text-aqua/90">{transparencyText.map((t) => <p key={t}>{t}</p>)}</div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold">Уровни достоверности сообщений</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {reliabilityLevels.map((l) => <li key={l.level} className="flex gap-3"><span className="num font-semibold text-teal">{l.level}</span><span>{l.text}</span></li>)}
          </ul>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold">Факты игры</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-aqua/90">
        <li>10 литров в день: нижняя граница «базового доступа» по классификации ВОЗ. Ниже начинаются риски для здоровья.</li>
        <li>50 литров: рекомендуемый ВОЗ минимум для удовлетворения базовых потребностей.</li>
        <li>Сценарии «Город», «Село», «Засушливый регион» и «Период перебоев» — игровые модели, а не утверждение об одинаковых реальных условиях.</li>
        <li>Стоимость воды у торговцев в 10–20 раз выше водопроводной: данные UN-Habitat по неформальным поселениям.</li>
      </ul>

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
