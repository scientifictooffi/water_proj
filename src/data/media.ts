export type Video = { id: string; title: string; channel: string; minutes: number; topic: string; desc: string }

export const videos: Video[] = [
  { id: 'vB68xvRb2T4', title: 'Our Global Water Crisis, Explained', channel: 'Our Changing Climate', minutes: 10, topic: 'Общая картина', desc: 'Почему воды на планете много, а пресной и чистой не хватает.' },
  { id: 'Pz6AQXQGupQ', title: 'Where we get our fresh water', channel: 'TED-Ed', minutes: 4, topic: 'Общая картина', desc: 'Пресной воды всего 2,5%: откуда она берётся и кто её тратит.' },
  { id: 'GluchjVKFro', title: 'WaterAid Explains: Why is access to water unequal?', channel: 'WaterAid', minutes: 1, topic: 'Общая картина', desc: 'Короткое объяснение, почему доступ к воде распределён несправедливо.' },
  { id: 'fEQ0pDMN3ow', title: 'Unsafe water, hygiene and sanitation kills 1000 children under 5 every day', channel: 'UNICEF', minutes: 2, topic: 'Санитария', desc: 'Как небезопасная вода и санитария влияют на здоровье детей.' },
  { id: '_VmANXNoXqQ', title: 'Report: One in four people globally face extreme water scarcity', channel: 'DW News', minutes: 6, topic: 'Климат', desc: 'Разбор отчёта WRI Aqueduct 2023 о водном стрессе.' },
  { id: 'gi3aZLA1tMw', title: "Water Crisis: A Global Problem That's Getting Worse | Planet A", channel: 'VICE News', minutes: 23, topic: 'Климат', desc: 'Как климат и коммерциализация воды усиливают дефицит.' },
  { id: '5N-_69cWyKo', title: 'Aral Sea: The sea that dried up in 40 years', channel: 'BBC News', minutes: 6, topic: 'Аральское море', desc: 'Как исчезло четвёртое по величине озеро мира и что удалось вернуть на севере.' },
  { id: '-3BDJb886LM', title: 'Аральская катастрофа: пути решения', channel: 'Khabar News', minutes: 24, topic: 'Аральское море', desc: 'Документальный фильм на русском о состоянии Арала и попытках его спасти.' },
]

export const topics = ['Все', 'Общая картина', 'Санитария', 'Климат', 'Аральское море']

export const mediaTabs = ['Все', 'Истории людей', 'Исследования', 'Видео', 'Инфографика'] as const
export type MediaTab = (typeof mediaTabs)[number]

export type MediaItem = { tab: Exclude<MediaTab, 'Все'>; title: string; tag: string; minutes: number; img: string; href?: string }

const articles: MediaItem[] = [
  { tab: 'Истории людей', title: 'Аральское море: уроки для будущего', tag: 'Экология', minutes: 8, img: '/kz/aral.jpg' },
  { tab: 'Истории людей', title: 'Вода в степи: как живут с дефицитом', tag: 'Регионы', minutes: 6, img: '/kz/balkhash.jpg' },
  { tab: 'Исследования', title: 'Очистные сооружения: что важно знать?', tag: 'Инфраструктура', minutes: 5, img: '/kz/syrdarya.jpg' },
  { tab: 'Исследования', title: 'Трансграничные реки Казахстана', tag: 'Гидрология', minutes: 9, img: '/kz/irtysh.jpg' },
  { tab: 'Инфографика', title: 'Сколько воды уходит за день', tag: 'Потребление', minutes: 2, img: '/kz/balkhash.jpg' },
  { tab: 'Инфографика', title: 'Путь воды от реки до крана', tag: 'Водоснабжение', minutes: 3, img: '/kz/irtysh.jpg' },
]

export const mediaItems: MediaItem[] = [
  ...articles,
  ...videos.map((v): MediaItem => ({ tab: 'Видео', title: v.title, tag: v.topic, minutes: v.minutes, img: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, href: `https://www.youtube.com/watch?v=${v.id}` })),
]
