import { Link } from 'react-router-dom'
import { links } from '../data/nav'

export function Footer() {
  return (
    <footer className="border-t border-teal/15 bg-deeper px-4 py-10 text-sm text-aqua/70">
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[1.5fr_2fr]">
        <div>
          <div className="font-display text-lg font-extrabold text-white">SU DAUYSY</div>
          <p className="mt-2">Су дауысы — «Голос воды». Увидеть. Понять. Изменить.</p>
          <p className="mt-3 text-xs text-aqua/50">Мониторинг не заменяет государственные службы. Сообщения жителей — наблюдения, а не официальные заключения.</p>
        </div>
        <div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((l) => <Link key={l.to} to={l.to} className="hover:text-teal">{l.label}</Link>)}
          </nav>
          <p className="mt-4 text-xs text-aqua/60">
            Источники: Бюро национальной статистики, QazSu, Казгидромет, санитарно-эпидемиологический контроль, платформа ЦУР. <Link to="/about#sources" className="text-teal underline underline-offset-4">Подробнее об источниках</Link>. Цифры на страницах «Аналитика» и «Атлас» иллюстративные, цифры в игре приближённые.
          </p>
        </div>
      </div>
    </footer>
  )
}
