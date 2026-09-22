export type Fact = { stat: string; text: string; source: string; url: string; year: number }
export type Section = { id: string; title: string; icon: string; intro: string; facts: Fact[] }

export const sections: Section[] = [
  {
    id: 'access',
    title: 'Доступ к питьевой воде',
    icon: '🚰',
    intro: 'Цель 6.1 требует всеобщего доступа к безопасной и доступной по цене питьевой воде к 2030 году. Мир отстаёт от графика в несколько раз.',
    facts: [
      { stat: '2,2 млрд', text: 'человек не имели безопасно организованного водоснабжения дома (данные 2022 г.).', source: 'WHO/UNICEF JMP', url: 'https://washdata.org/reports/jmp-2023-wash-households-launch', year: 2023 },
      { stat: '703 млн', text: 'человек не имеют даже базового доступа к питьевой воде.', source: 'UN SDG Report, Goal 6', url: 'https://unstats.un.org/sdgs/report/2024/Goal-06/', year: 2024 },
      { stat: '7 из 10', text: 'домохозяйств без воды на участке — воду носят женщины и девочки старше 15 лет (у мужчин — 3 из 10).', source: 'WHO/UNICEF JMP', url: 'https://www.who.int/news/item/06-07-2023-women-and-girls-bear-brunt-of-water-and-sanitation-crisis---new-unicef-who-report', year: 2023 },
    ],
  },
  {
    id: 'sanitation',
    title: 'Санитария и гигиена',
    icon: '🚽',
    intro: 'Санитария касается не только туалетов: это школы, больницы, менструальная гигиена и достоинство человека.',
    facts: [
      { stat: '3,5 млрд', text: 'человек не имеют безопасно организованной санитарии.', source: 'WHO/UNICEF JMP', url: 'https://washdata.org/reports/jmp-2023-wash-households-launch', year: 2023 },
      { stat: '419 млн', text: 'человек всё ещё практикуют открытую дефекацию.', source: 'WHO/UNICEF JMP', url: 'https://washdata.org/reports/jmp-2023-wash-households-launch', year: 2023 },
      { stat: '2 млрд', text: 'человек не имеют дома возможности помыть руки с мылом и водой.', source: 'UN SDG Report, Goal 6', url: 'https://unstats.un.org/sdgs/report/2024/Goal-06/', year: 2024 },
      { stat: '1,4 млн', text: 'смертей в год связаны с небезопасной водой, санитарией и гигиеной; около 1 млн из них — от диарейных болезней.', source: 'WHO', url: 'https://www.who.int/news-room/fact-sheets/detail/sanitation', year: 2024 },
    ],
  },
  {
    id: 'pollution',
    title: 'Загрязнение',
    icon: '🏭',
    intro: 'Даже там, где вода есть, она часто непригодна: сточные воды, удобрения, пластик и промышленные сбросы.',
    facts: [
      { stat: '~42%', text: 'бытовых сточных вод в мире сбрасываются без безопасной очистки (2022 г., 140 стран).', source: 'UN SDG Report, Goal 6', url: 'https://unstats.un.org/sdgs/report/2024/Goal-06/', year: 2024 },
      { stat: '9–14 млн т', text: 'пластика ежегодно попадает в реки, озёра и океан; к 2040 году объём может вырасти до 23–37 млн т.', source: 'UNEP, From Pollution to Solution', url: 'https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution', year: 2021 },
      { stat: '56%', text: 'из 91 000 отслеживаемых водных объектов в 120 странах имеют хорошее качество воды; по остальным странам данных часто просто нет.', source: 'UNEP GEMS/Water, SDG 6.3.2', url: 'https://www.unwater.org/publications/progress-ambient-water-quality-2024-update', year: 2024 },
    ],
  },
  {
    id: 'climate',
    title: 'Климат и водный стресс',
    icon: '🌡️',
    intro: 'Изменение климата проявляется в первую очередь через воду: засухи, наводнения, таяние ледников и засоление.',
    facts: [
      { stat: '2,4 млрд', text: 'человек живут в странах с водным стрессом.', source: 'UN SDG Report, Goal 6', url: 'https://unstats.un.org/sdgs/report/2023/Goal-06/', year: 2023 },
      { stat: '25 стран', text: 'ежегодно используют более 80% своих возобновляемых водных ресурсов; Казахстан относится к группе средне-высокого стресса.', source: 'WRI Aqueduct 4.0', url: 'https://www.wri.org/insights/highest-water-stressed-countries', year: 2023 },
      { stat: '>90%', text: 'стихийных бедствий связаны с водой и погодой: наводнения, засухи, штормы.', source: 'UN Water', url: 'https://www.unwater.org/water-facts/water-and-climate-change', year: 2023 },
      { stat: '−90%', text: 'объёма и −75% площади Аральского моря потеряно с 1960-х из-за забора воды на орошение. Ближайший к нам пример водной катастрофы.', source: 'UNEP/GRID-Geneva', url: 'https://hotspots.unepgrid.ch/site/aral-sea', year: 2022 },
    ],
  },
]

export const waterFootprint = [
  { item: 'Чашка кофе', liters: 130, emoji: '☕' },
  { item: 'Хлопковая футболка', liters: 2700, emoji: '👕' },
  { item: 'Килограмм говядины', liters: 15400, emoji: '🥩' },
  { item: 'Килограмм риса', liters: 2500, emoji: '🍚' },
  { item: 'Пара джинсов', liters: 8000, emoji: '👖' },
  { item: 'Литр молока', liters: 1020, emoji: '🥛' },
  { item: 'Одно яблоко', liters: 70, emoji: '🍎' },
  { item: 'Стакан пива (250 мл)', liters: 74, emoji: '🍺' },
]

export const dailyUse = [
  { region: 'США', liters: 310 },
  { region: 'Европа (среднее)', liters: 150 },
  { region: 'Казахстан (среднее по стране)', liters: 84 },
  { region: 'Норма ВОЗ (минимум)', liters: 50 },
  { region: 'Сахель, сельские районы', liters: 15 },
  { region: 'Твой день в игре', liters: 10 },
]

export const targets = [
  { id: '6.1', text: 'Всеобщий доступ к безопасной и недорогой питьевой воде' },
  { id: '6.2', text: 'Доступ к санитарии и гигиене, конец открытой дефекации' },
  { id: '6.3', text: 'Улучшить качество воды, сократить загрязнение и сбросы' },
  { id: '6.4', text: 'Эффективное использование воды, снижение водного стресса' },
  { id: '6.5', text: 'Интегрированное управление водными ресурсами' },
  { id: '6.6', text: 'Защита водных экосистем: горы, леса, реки, водоносные слои' },
  { id: '6.a', text: 'Международное сотрудничество и наращивание потенциала' },
  { id: '6.b', text: 'Участие местных сообществ в управлении водой' },
]
