const paths: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  game: 'M6 9h12a3 3 0 013 3v3a3 3 0 01-5.2 2L14 15h-4l-1.8 2A3 3 0 013 15v-3a3 3 0 013-3zM8 11v3M6.5 12.5h3M16 12h.01M18 13.5h.01',
  message: 'M4 5h16v11H9l-5 4V5z',
  chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  book: 'M3 5h7a2 2 0 012 2v13a2 2 0 00-2-2H3V5zM21 5h-7a2 2 0 00-2 2v13a2 2 0 012-2h7V5z',
  users: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M17 11a2.5 2.5 0 100-5M17 14a5 5 0 014 6',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',
  droplet: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
  pin: 'M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.800 12 21 12 21zM12 12a2.500 2.500 0 100-5 2.500 2.500 0 000 5z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  alert: 'M12 4l10 17H2L12 4zM12 10v5M12 18h.01',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12l5 5 9-10',
  camera: 'M4 8h4l2-3h4l2 3h4v11H4V8zM12 17a3.500 3.500 0 100-7 3.500 3.500 0 000 7z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  chevron: 'M9 5l7 7-7 7',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',
  sink: 'M4 11h16a0 0 0 010 0 8 6 0 01-16 0zM12 11V5a2 2 0 014 0M8 20h8',
  shower: 'M5 8a7 7 0 0114 0H5zM8 12v2M12 12v3M16 12v2M10 18v2M14 18v2',
  pot: 'M5 10h14v7a3 3 0 01-3 3H8a3 3 0 01-3-3v-7zM3 10h18M9 6c0-2 2-2 2-4M14 6c0-2 2-2 2-4',
  washer: 'M5 3h14v18H5V3zM5 7h14M12 18a4 4 0 100-8 4 4 0 000 8zM8 5h.01M11 5h.01',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  leaf: 'M5 19c0-9 5-14 15-14 0 9-4 14-12 14M5 19l7-7',
  shield: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
}

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={paths[name] ?? paths.info} />
    </svg>
  )
}
