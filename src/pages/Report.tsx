import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { moderationNote } from '../data/sources'

const cats = ['Перебои с водоснабжением', 'Загрязнение воды', 'Утечка или авария', 'Канализация и очистные', 'Дефицит / засуха', 'Паводок или затопление', 'Другое']
const steps = ['Описание', 'Место', 'Подтверждение']

export function Report() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<string | null>(null)
  const [f, setF] = useState({ cat: cats[0], text: '', photo: '', region: '', place: '', date: '', consent: false })
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))
  const valid = [f.text.trim().length >= 10, f.region.trim().length > 0, f.consent]

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid[2]) return
    setDone('SD-' + String(Date.now()).slice(-6))
  }

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="frame grid min-w-0 gap-4 md:grid-cols-[220px_1fr] [&>*]:min-w-0">
        <div className="relative hidden min-h-[420px] overflow-hidden rounded-2xl md:block">
          <img src="/kz/syrdarya.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ocean/50 mix-blend-multiply" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-deeper/70 to-transparent" aria-hidden />
        </div>
        <div className="paper p-5 md:p-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">Сообщить о проблеме</h1>
          <p className="muted mt-2 text-sm">Заметили проблему с водой? Расскажите нам. Это поможет сделать ситуацию в Казахстане понятнее.</p>
      {done ? (
        <div className="mt-6 rounded-2xl bg-white p-6" role="status">
          <Icon name="check" className="h-10 w-10 text-[#0f9d9a]" />
          <h2 className="mt-3 text-2xl font-bold">Сообщение принято</h2>
          <p className="mt-2 num text-[#0f9d9a]">{done} · статус L0 · ожидает проверки</p>
          <p className="mt-4 text-slate-700">{moderationNote}</p>
          <p className="mt-3 text-xs muted">Это демо-форма: данные никуда не отправляются и не сохраняются.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-teal" onClick={() => { setDone(null); setStep(0); setF({ cat: cats[0], text: '', photo: '', region: '', place: '', date: '', consent: false }) }}>Отправить ещё одно</button>
            <Link to="/atlas" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Открыть атлас</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5">
          <ol className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            {steps.map((s, i) => (
              <li key={s} className={`flex items-center gap-2 ${i === step ? 'font-semibold text-deeper' : 'text-slate-400'}`}>
                <span className={`num grid h-7 w-7 place-items-center rounded-full ${i <= step ? 'bg-[#0f9d9a] text-white' : 'bg-slate-200'}`}>{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          {step === 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Категория проблемы *
                <select className="field mt-1" value={f.cat} onChange={(e) => set('cat', e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select>
              </label>
              <label className="block text-sm font-semibold">Описание * <span className="font-normal muted">(не менее 10 символов)</span>
                <textarea className="field mt-1" rows={5} maxLength={500} value={f.text} onChange={(e) => set('text', e.target.value)} placeholder="Опишите, что происходит..." />
                <span className="num muted block text-right text-xs">{f.text.length} / 500</span>
              </label>
              <div className="text-sm font-semibold">Прикрепить фото (необязательно)
                <div className="mt-1 flex items-center gap-3">
                  <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-ocean to-deep text-white">{f.photo ? <Icon name="camera" className="h-6 w-6" /> : <img src="/kz/syrdarya.jpg" alt="" className="h-full w-full object-cover" />}</div>
                  <label className="grid h-16 w-16 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-teal"><Icon name="plus" className="h-6 w-6" /><input type="file" accept="image/*" className="sr-only" onChange={(e) => set('photo', e.target.files?.[0]?.name ?? '')} /></label>
                  <span className="muted text-xs">{f.photo || 'Фото не выбрано'}</span>
                </div>
              </div>
              <p className="text-xs muted">Не публикуйте на фото людей и номера автомобилей.</p>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Регион или город *
                <input className="field mt-1" value={f.region} onChange={(e) => set('region', e.target.value)} placeholder="Например: Карагандинская область" />
              </label>
              <label className="block text-sm font-semibold">Населённый пункт, улица или водный объект
                <input className="field mt-1" value={f.place} onChange={(e) => set('place', e.target.value)} />
              </label>
              <label className="block text-sm font-semibold">Когда заметили
                <input type="date" className="field mt-1" value={f.date} onChange={(e) => set('date', e.target.value)} />
              </label>
              <p className="text-xs muted">Точный адрес частных объектов и персональные данные на публичной карте не показываются.</p>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 text-sm">
              <dl className="grid gap-2 rounded-xl bg-white p-4">
                <div><dt className="muted">Категория</dt><dd>{f.cat}</dd></div>
                <div><dt className="muted">Описание</dt><dd>{f.text}</dd></div>
                <div><dt className="muted">Место</dt><dd>{[f.region, f.place].filter(Boolean).join(', ')}{f.date && ` · ${f.date}`}</dd></div>
                {f.photo && <div><dt className="muted">Фото</dt><dd>{f.photo}</dd></div>}
              </dl>
              <p className="text-slate-700">{moderationNote}</p>
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-teal" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} />
                <span>Я согласен(на) на обработку данных в соответствии с законодательством Республики Казахстан о персональных данных и понимаю, что сообщение будет опубликовано только после модерации. *</span>
              </label>
            </div>
          )}
          <div className="mt-8 flex justify-between gap-3">
            <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold" disabled={step === 0} onClick={() => setStep(step - 1)}>Назад</button>
            {step < 2 ? (
              <button type="button" className="btn-teal flex-1" disabled={!valid[step]} onClick={() => setStep(step + 1)}>Продолжить<Icon name="arrow" className="h-4 w-4" /></button>
            ) : (
              <button type="submit" className="btn-teal flex-1" disabled={!valid[2]}>Отправить</button>
            )}
          </div>
        </form>
      )}
        </div>
      </div>
    </section>
  )
}
