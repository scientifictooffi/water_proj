import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Slide = { name: string; img: string; text: string }

export function Carousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (d: number) => { setDir(d); setI((p) => (p + d + slides.length) % slides.length) }
  const s = slides[i]
  return (
    <div className="glass relative overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-deeper md:aspect-[16/7]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={s.img}
            src={s.img}
            alt={s.name}
            className="absolute inset-0 h-full w-full object-cover"
            custom={dir}
            initial={{ x: dir * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -dir * 80, opacity: 0 }}
            transition={{ duration: .45 }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 className="text-2xl font-extrabold md:text-3xl">{s.name}</h3>
          <p className="mt-2 max-w-2xl text-aqua/90">{s.text}</p>
        </div>
        <button onClick={() => go(-1)} aria-label="Назад" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-deep/60 p-3 text-xl backdrop-blur transition hover:bg-teal hover:text-deep">‹</button>
        <button onClick={() => go(1)} aria-label="Вперёд" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-deep/60 p-3 text-xl backdrop-blur transition hover:bg-teal hover:text-deep">›</button>
      </div>
      <div className="flex justify-center gap-2 py-4">
        {slides.map((x, k) => (
          <button key={x.name} onClick={() => { setDir(k > i ? 1 : -1); setI(k) }} aria-label={x.name} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-teal' : 'w-2 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
    </div>
  )
}
