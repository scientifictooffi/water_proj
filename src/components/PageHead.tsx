import type { ReactNode } from 'react'

export function PageHead({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-aqua/80">{text}</p>
      {children}
    </div>
  )
}
