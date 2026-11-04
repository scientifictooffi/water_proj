import { useState } from 'react'
import { Icon } from '../components/Icon'
import { mediaItems, mediaTabs, type MediaTab } from '../data/media'

export function Media() {
  const [tab, setTab] = useState<MediaTab>('Все')
  const list = mediaItems.filter((m) => tab === 'Все' || m.tab === tab)
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="frame">
        <div className="paper p-5 md:p-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">Медиатека</h1>
          <p className="muted mt-2 text-sm">Истории, исследования и материалы о воде Казахстана. Видео — внешние ролики UN, UNICEF, WaterAid и других каналов.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {mediaTabs.map((t) => <button key={t} className="tab" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <div className="relative mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => {
                const body = (
                  <>
                    <img src={m.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                    <div className="p-3">
                      <h3 className="text-sm font-bold leading-snug">{m.title}</h3>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="chip-light rounded-md px-2 py-0.5 font-semibold">{m.tag}</span>
                        <span className="num muted">{m.minutes} мин</span>
                      </div>
                    </div>
                  </>
                )
                const cls = 'block overflow-hidden rounded-xl card-dark transition hover:border-aqua/40'
                return m.href ? <a key={m.title} href={m.href} target="_blank" rel="noreferrer" className={cls}>{body}</a> : <article key={m.title} className={cls}>{body}</article>
              })}
            </div>
            <span aria-hidden className="absolute -right-3 top-1/3 hidden h-10 w-10 place-items-center rounded-full bg-[#5EEAD4] text-deeper shadow-lg lg:grid"><Icon name="chevron" className="h-5 w-5" /></span>
          </div>
          <p className="muted mt-5 text-xs">Статьи, исследования и инфографика пока представлены как примеры карточек; у каждого материала будет указан источник и дата.</p>
        </div>
      </div>
    </section>
  )
}
