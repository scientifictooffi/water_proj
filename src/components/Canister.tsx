import { motion } from 'framer-motion'

export function Canister({ liters, max = 10, size = 160 }: { liters: number; max?: number; size?: number }) {
  const pct = Math.max(0, Math.min(1, liters / max))
  const h = size * 1.3
  const fillH = (h - 24) * pct
  return (
    <div className="relative select-none" style={{ width: size, height: h }}>
      <svg viewBox={`0 0 ${size} ${h}`} width={size} height={h} className="absolute inset-0">
        <defs>
          <clipPath id="can">
            <rect x="8" y="24" width={size - 16} height={h - 32} rx="18" />
          </clipPath>
        </defs>
        <rect x="8" y="24" width={size - 16} height={h - 32} rx="18" fill="rgba(168,230,240,.08)" stroke="#A8E6F0" strokeOpacity=".4" strokeWidth="2" />
        <rect x={size / 2 - 22} y="6" width="44" height="22" rx="6" fill="#A8E6F0" fillOpacity=".3" />
        <g clipPath="url(#can)">
          <motion.g animate={{ y: h - 8 - fillH }} transition={{ type: 'spring', stiffness: 60, damping: 14 }}>
            <motion.path
              d={`M-${size} 6 Q -${size * 0.75} 0 -${size / 2} 6 T 0 6 T ${size / 2} 6 T ${size} 6 T ${size * 1.5} 6 T ${size * 2} 6 V ${h * 2} H -${size} Z`}
              fill={pct < 0.25 ? '#D9B382' : '#1FB6C1'}
              animate={{ x: [0, -size / 2] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            <motion.path
              d={`M-${size} 10 Q -${size * 0.75} 16 -${size / 2} 10 T 0 10 T ${size / 2} 10 T ${size} 10 T ${size * 1.5} 10 T ${size * 2} 10 V ${h * 2} H -${size} Z`}
              fill={pct < 0.25 ? '#c9a06a' : '#168f99'}
              opacity=".7"
              animate={{ x: [-size / 2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          </motion.g>
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="font-display text-3xl font-bold drop-shadow">{liters.toFixed(1)}</span>
        <span className="text-xs uppercase tracking-widest opacity-80">литров</span>
      </div>
    </div>
  )
}
