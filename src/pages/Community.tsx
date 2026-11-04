import { useState } from 'react'
import { Icon } from '../components/Icon'
import { communityItems, communityTabs, type CommunityTab } from '../data/community'

export function Community() {
  const [tab, setTab] = useState<CommunityTab>('Инициативы')
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="frame">
        <div className="paper p-5 md:p-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">Сообщество SU DAUYSY</h1>
          <p className="muted mt-2 text-sm">Люди, проекты и мероприятия для сохранения воды в Казахстане. Карточки демонстрационные.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {communityTabs.map((t) => <button key={t} className="tab" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <div className="relative mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {communityItems.filter((c) => c.tab === tab).map((c) => (
                <article key={c.title} className="overflow-hidden rounded-xl card-dark">
                  <img src={c.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-3">
                    <h3 className="text-sm font-bold">{c.title}</h3>
                    <p className="muted mt-1 text-xs">{c.desc}</p>
                    <div className="muted mt-3 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1"><Icon name="pin" className="h-4 w-4" />{c.place}</span>
                      <span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4" />{c.when}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <span aria-hidden className="absolute -right-3 top-1/3 hidden h-10 w-10 place-items-center rounded-full bg-[#5EEAD4] text-deeper shadow-lg lg:grid"><Icon name="chevron" className="h-5 w-5" /></span>
          </div>
        </div>
      </div>
    </section>
  )
}
