export type Habit = { id: string; label: string; saveLitersPerDay: number }

export const habits: Habit[] = [
  { id: 'shower', label: 'Сократить душ с 10 до 5 минут', saveLitersPerDay: 45 },
  { id: 'tap', label: 'Закрывать кран при чистке зубов', saveLitersPerDay: 20 },
  { id: 'leak', label: 'Починить капающий кран', saveLitersPerDay: 30 },
  { id: 'flush', label: 'Установить двухрежимный смыв', saveLitersPerDay: 20 },
  { id: 'wash', label: 'Стирать только полную загрузку', saveLitersPerDay: 25 },
  { id: 'meat', label: 'Один день без мяса в неделю', saveLitersPerDay: 500 },
]

export const organizations = [
  { name: 'charity: water', url: 'https://www.charitywater.org', desc: '100% публичных пожертвований идёт на проекты по воде в 29 странах.' },
  { name: 'WaterAid', url: 'https://www.wateraid.org', desc: 'Вода, санитария и гигиена в 22 странах с 1981 года.' },
  { name: 'UNICEF WASH', url: 'https://www.unicef.org/wash', desc: 'Программы воды и санитарии для детей и школ.' },
  { name: 'Water.org', url: 'https://water.org', desc: 'Микрокредиты на подключение к воде и туалеты.' },
]

export const challenge = [
  'Замерь, сколько литров ты тратишь за день (счётчик или калькулятор ниже).',
  'День с 50 литрами: минимум по норме ВОЗ. Записывай ощущения.',
  'Проверь дом на протечки: кран, бачок, стиральная машина.',
  'Посмотри одно видео из медиатеки и расскажи кому-нибудь один факт.',
  'Приготовь день без мяса и посчитай сэкономленный водный след.',
  'Найди, откуда вода в твоём городе и куда уходят стоки.',
  'Пройди игру ещё раз с другим персонажем. Сравни результаты.',
]
