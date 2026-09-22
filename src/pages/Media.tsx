import { useState } from 'react'
import { videos, topics } from '../data/media'

export function Media() {
  const [topic, setTopic] = useState('Все')
  const [open, setOpen] = useState<string | null>(null)
  const list = videos.filter((v) => topic === 'Все' || v.topic === topic)
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-extrabold md:text-4xl">Медиатека</h1>
      <p className="mt-3 max-w-2xl text-aqua/80">Документальные фильмы и короткие ролики от UN, UNICEF, WaterAid и научно-популярных каналов.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {topics.map((t) => <button key={t} onClick={() => setTopic(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${topic === t ? 'bg-teal text-deep' : 'glass hover:bg-white/10'}`}>{t}</button>)}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <div key={v.id} className="glass overflow-hidden rounded-2xl">
            <div className="aspect-video bg-black">
              {open === v.id ? (
                <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media" allowFullScreen />
              ) : (
                <button onClick={() => setOpen(v.id)} className="group relative h-full w-full">
                  <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow">▶</span>
                </button>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between text-xs text-aqua/60"><span>{v.channel}</span><span>{v.minutes} мин · {v.topic}</span></div>
              <h3 className="mt-1 font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-aqua/80">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
