export type Effects = { water: number; health?: number; social?: number; money?: number }

export type Choice = {
  label: string
  hint?: string
  effects: Effects
  next: string
  requires?: (s: GameState) => boolean
}

export type Scene = {
  id: string
  time: string
  title: string
  text: string
  choices: Choice[]
}

export type GameState = { water: number; health: number; social: number; money: number }

export type Character = {
  id: string
  name: string
  place: string
  desc: string
  start: GameState
  emoji: string
  img: string
}

export const characters: Character[] = [
  {
    id: 'amina',
    name: 'Амина, 12 лет',
    place: 'Село в регионе Афар, Эфиопия',
    desc: 'Ближайший колодец в 4 км. Утро начинается с похода за водой вместо школы.',
    start: { water: 10, health: 70, social: 60, money: 2 },
    emoji: '👧🏾',
    img: '/chars/amina.png',
  },
  {
    id: 'dana',
    name: 'Дана, 34 года',
    place: 'Кызылорда, Казахстан',
    desc: 'Засуха, вода из крана идёт по графику. Двое детей, работа в поликлинике.',
    start: { water: 10, health: 74, social: 64, money: 6 },
    emoji: '👩🏻',
    img: '/chars/dana.png',
  },
  {
    id: 'omar',
    name: 'Омар, 41 год',
    place: 'Окраина Карачи, Пакистан',
    desc: 'Водопровод не работает вторую неделю. Воду продают с грузовиков по 5 рупий за литр.',
    start: { water: 10, health: 65, social: 65, money: 4 },
    emoji: '👨🏽',
    img: '/chars/omar.png',
  },
]

export const scenes: Record<string, Scene> = {
  morning: {
    id: 'morning',
    time: '06:30',
    title: 'Рассвет',
    text: 'В канистре ровно 10 литров. Это всё до завтра. Во рту сухо, лицо в пыли после ночи. Первое решение дня.',
    choices: [
      { label: 'Умыться и почистить зубы', hint: '−1,5 л', effects: { water: -1.5, health: 3, social: 3 }, next: 'breakfast' },
      { label: 'Прополоскать рот и глотнуть', hint: '−0,5 л', effects: { water: -0.5, health: 0, social: 0 }, next: 'breakfast' },
      { label: 'Только глоток из канистры', hint: '−0,3 л', effects: { water: -0.3, health: -4, social: -3 }, next: 'breakfast' },
    ],
  },
  breakfast: {
    id: 'breakfast',
    time: '07:15',
    title: 'Завтрак',
    text: 'В животе урчит. Каша требует воды на варку и мытьё кастрюли. Хлеб и чай обходятся дешевле. Можно и не есть.',
    choices: [
      { label: 'Сварить кашу', hint: '−1,5 л', effects: { water: -1.5, health: 6 }, next: 'hygiene' },
      { label: 'Хлеб и кружка чая', hint: '−0,5 л', effects: { water: -0.5, health: 2 }, next: 'hygiene' },
      { label: 'Пропустить завтрак, только вода', hint: '−0,5 л', effects: { water: -0.5, health: -5 }, next: 'hygiene' },
    ],
  },
  hygiene: {
    id: 'hygiene',
    time: '08:00',
    title: 'Собраться на выход',
    text: 'Впереди работа и люди. Обычный душ тратит 8–10 литров в минуту, для тебя это недоступно. Есть ведро и тряпка.',
    choices: [
      { label: 'Ополоснуться из ведра', hint: '−4 л', effects: { water: -4, health: 5, social: 6 }, next: 'day' },
      { label: 'Обтереться влажной тканью', hint: '−1 л', effects: { water: -1, health: 2, social: 2 }, next: 'day' },
      { label: 'Пропустить', hint: '0 л', effects: { water: 0, health: -3, social: -8 }, next: 'day' },
    ],
  },
  day: {
    id: 'day',
    time: '12:30',
    title: 'Жара',
    text: 'Полдень. Термометр показывает +38°. Врачи говорят: минимум 2 литра питья в день. Рядом торговец продаёт воду в бутылках без этикеток: литр за 2 монеты, остальное всё равно из канистры.',
    choices: [
      { label: 'Пить по норме', hint: '−2 л', effects: { water: -2, health: 4 }, next: 'event' },
      { label: 'Экономить, пить по глотку', hint: '−1 л', effects: { water: -1, health: -6 }, next: 'event' },
      {
        label: 'Купить воду у торговца',
        hint: '−2 монеты и −1 л',
        effects: { water: -1, money: -2, health: -2 },
        next: 'event_bought',
        requires: (s) => s.money >= 2,
      },
    ],
  },
  event_bought: {
    id: 'event_bought',
    time: '13:00',
    title: 'Бутылка без этикетки',
    text: 'Вода отдаёт железом. Сосед говорит, что торговец набирает её из канала за городом. По данным ВОЗ, каждая четвёртая продаваемая неофициально вода в таких районах содержит кишечную палочку. Ты уже выпил половину.',
    choices: [
      { label: 'Допить, другой воды нет', effects: { water: 0, health: -8 }, next: 'event' },
      { label: 'Вылить и пить из канистры', hint: '−1,5 л', effects: { water: -1.5, health: 2 }, next: 'event' },
    ],
  },
  event: {
    id: 'event',
    time: '15:00',
    title: 'Стук в дверь',
    text: 'У соседей заболел ребёнок: диарея, обезвоживание. Для раствора регидратации нужно чистой воды. Они просят литр. Свой запас тает.',
    choices: [
      { label: 'Отдать литр', hint: '−1 л', effects: { water: -1, social: 8, health: 0 }, next: 'evening' },
      { label: 'Отдать полстакана', hint: '−0,2 л', effects: { water: -0.2, social: 3 }, next: 'evening' },
      { label: 'Отказать', hint: '0 л', effects: { water: 0, social: -12 }, next: 'evening' },
    ],
  },
  evening: {
    id: 'evening',
    time: '19:30',
    title: 'Вечер',
    text: 'Гора посуды, грязная одежда, туалет. Один смыв обычного унитаза это 6–9 литров, в твоей канистре столько не было даже утром. Два литра на туалет уйдут в любом случае. Что важнее?',
    choices: [
      { label: 'Туалет, посуда и стирка', hint: '−4 л', effects: { water: -4, health: 4, social: 5 }, next: 'night' },
      { label: 'Туалет и посуда', hint: '−2,5 л', effects: { water: -2.5, health: 2, social: 0 }, next: 'night' },
      { label: 'Только туалет, остальное до завтра', hint: '−2 л', effects: { water: -2, health: -5, social: -5 }, next: 'night' },
    ],
  },
  night: {
    id: 'night',
    time: '22:00',
    title: 'Ночь',
    text: 'День закончен. Завтра снова 10 литров. Или меньше, если грузовик с водой не приедет.',
    choices: [],
  },
}

export const START_SCENE = 'morning'

export type Ending = { id: string; title: string; text: string; tone: 'ok' | 'warn' | 'bad' }

export function pickEnding(s: GameState, log: string[]): Ending {
  if (s.water < 0) {
    return {
      id: 'dry',
      title: 'Ночь без воды',
      text: 'Ты потратил всё раньше вечера. Пить нечего, руки не вымыть, ребёнок просит воды. Так заканчивается день у сотен миллионов людей, и не по вине их выбора: 10 литров просто не хватает на человеческую жизнь.',
      tone: 'bad',
    }
  }
  if (s.health < 60) {
    return {
      id: 'sick',
      title: 'Ты заболел',
      text: 'Экономия на питье и гигиене сработала как всегда: обезвоживание, потом кишечная инфекция. Диарейные болезни, связанные с грязной водой и плохой санитарией, ежегодно уносят около 1 миллиона жизней.',
      tone: 'bad',
    }
  }
  if (log.includes('event_bought')) {
    return {
      id: 'bought',
      title: 'Опасный компромисс',
      text: 'Ты купил воду, чтобы сохранить запас. Так поступают миллионы горожан без водопровода, и платят за литр в 10–20 раз дороже, чем жители богатых районов с краном. Часто эта вода небезопасна.',
      tone: 'warn',
    }
  }
  if (s.social < 65) {
    return {
      id: 'alone',
      title: 'Выжил, но не жил',
      text: 'Вода осталась, а вот отношения с людьми пострадали. Без гигиены и без помощи соседям человек быстро выпадает из общества. Для девочек это ещё и пропуск школы во время менструации: так теряют образование миллионы.',
      tone: 'warn',
    }
  }
  return {
    id: 'balanced',
    title: 'Ты справился. На один день.',
    text: 'Ты прошёл день аккуратно, и всё же посмотри: ни душа, ни стирки, ни нормального туалета. Это не «экономия». Это черта, за которой водный доступ перестаёт быть правом и становится ежедневной борьбой.',
    tone: 'ok',
  }
}
