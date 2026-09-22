export function Wave({ flip = false, color = '#06142A' }: { flip?: boolean; color?: string }) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} aria-hidden>
      <div className="relative h-16 w-full">
        <svg className="wave-track slow absolute left-0 top-0 h-16 w-[200%]" viewBox="0 0 2880 60" preserveAspectRatio="none">
          <path d="M0 30 C 240 0, 480 60, 720 30 S 1200 0, 1440 30 S 1920 60, 2160 30 S 2640 0, 2880 30 V60 H0Z" fill={color} opacity=".5" />
        </svg>
        <svg className="wave-track absolute left-0 top-2 h-16 w-[200%]" viewBox="0 0 2880 60" preserveAspectRatio="none">
          <path d="M0 30 C 240 60, 480 0, 720 30 S 1200 60, 1440 30 S 1920 0, 2160 30 S 2640 60, 2880 30 V60 H0Z" fill={color} />
        </svg>
      </div>
    </div>
  )
}
