export type Layer = 'reports' | 'quality' | 'pollution' | 'drought' | 'floods' | 'infra' | 'waters'

export const layers: { id: Layer; label: string; color: string; on: boolean }[] = [
  { id: 'reports', label: 'Сообщения жителей', color: '#19BFC0', on: true },
  { id: 'quality', label: 'Качество воды', color: '#3B82F6', on: true },
  { id: 'pollution', label: 'Загрязнение', color: '#EF725F', on: true },
  { id: 'drought', label: 'Дефицит / засуха', color: '#F3B64C', on: false },
  { id: 'floods', label: 'Паводки', color: '#A78BFA', on: false },
  { id: 'infra', label: 'Инфраструктура', color: '#8FB3B8', on: false },
  { id: 'waters', label: 'Водоёмы и реки', color: '#50D1CC', on: true },
]

export type AtlasObject = {
  id: string
  name: string
  layer: Layer
  lon: number
  lat: number
  img?: string
  tag: string
  status: string
  text: string
  demo?: boolean
}

export const objects: AtlasObject[] = [
  { id: 'aral', name: 'Аральское море', layer: 'waters', lon: 60.5, lat: 45.5, img: '/kz/aral.jpg', tag: 'Экологическая проблема', status: 'Справочная информация', text: 'Один из наиболее известных примеров масштабных экологических изменений, связанных с использованием водных ресурсов.' },
  { id: 'balkhash', name: 'Балхаш', layer: 'waters', lon: 74.5, lat: 46.6, img: '/kz/balkhash.jpg', tag: 'Озеро', status: 'Справочная информация', text: 'Крупное озеро, состояние которого связано с количеством и качеством поступающей воды, климатом и хозяйственной деятельностью.' },
  { id: 'irtysh', name: 'Иртыш', layer: 'waters', lon: 76.5, lat: 51.2, img: '/kz/irtysh.jpg', tag: 'Трансграничная река', status: 'Справочная информация', text: 'Трансграничная река, имеющая большое значение для населения, промышленности и экосистем.' },
  { id: 'syrdarya', name: 'Сырдарья', layer: 'waters', lon: 65.5, lat: 44.8, img: '/kz/syrdarya.jpg', tag: 'Трансграничная река', status: 'Справочная информация', text: 'Одна из ключевых рек Центральной Азии, водные ресурсы которой используются несколькими государствами.' },
  { id: 'd1', name: 'Перебои с водой (пример)', layer: 'reports', lon: 71.4, lat: 51.2, tag: 'Наблюдение жителя', status: 'L0 · ожидает проверки', text: 'Пример карточки сообщения жителя. Статус показывает, насколько информация проверена.', demo: true },
  { id: 'd2', name: 'Цвет воды из крана (пример)', layer: 'quality', lon: 73.1, lat: 49.8, tag: 'Наблюдение жителя', status: 'L1 · проверено модератором', text: 'Пример: оформление и полнота проверены, лабораторного подтверждения пока нет.', demo: true },
  { id: 'd3', name: 'Загрязнение водоёма (пример)', layer: 'pollution', lon: 69.6, lat: 42.4, tag: 'Загрязнение', status: 'L0 · ожидает проверки', text: 'Пример отметки о возможном загрязнении. Фото не доказывает загрязнение без анализов.', demo: true },
  { id: 'd4', name: 'Маловодье (пример)', layer: 'drought', lon: 55.5, lat: 47.5, tag: 'Дефицит / засуха', status: 'L2 · есть подтверждение', text: 'Пример отметки о маловодье в засушливом регионе.', demo: true },
  { id: 'd5', name: 'Паводковый риск (пример)', layer: 'floods', lon: 66.9, lat: 54.0, tag: 'Паводки', status: 'L3 · официальные данные', text: 'Пример отметки о риске затопления в период половодья.', demo: true },
  { id: 'd6', name: 'Авария на водоводе (пример)', layer: 'infra', lon: 80.0, lat: 50.0, tag: 'Инфраструктура', status: 'L1 · проверено модератором', text: 'Пример сообщения об утечке на магистрали.', demo: true },
]

// Упрощённый контур Казахстана (lon, lat), только для иллюстрации
export const outline: [number, number][] = [
  [51, 51.8], [55, 50.7], [61, 51], [61.5, 53.5], [65, 54.5], [70, 55.3], [73, 54.8], [77, 53.3], [80, 51], [83, 51],
  [85.5, 49.5], [87.3, 49.1], [85.5, 47], [83, 47.2], [82, 45.5], [80.2, 42.8], [78, 42.8], [75, 42.9], [70.5, 42.2],
  [69, 41.2], [66, 43], [62, 43.5], [58, 45], [56, 41.3], [53, 42], [53, 45.4], [51.5, 47], [50, 46.5], [48, 46.6],
  [47, 48.5], [48.5, 50],
]
