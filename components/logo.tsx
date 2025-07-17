export function WolfLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Cabeza del lobo */}
      <ellipse cx="50" cy="45" rx="25" ry="20" fill="#4B5563" />

      {/* Orejas */}
      <ellipse cx="35" cy="30" rx="8" ry="12" fill="#4B5563" />
      <ellipse cx="65" cy="30" rx="8" ry="12" fill="#4B5563" />
      <ellipse cx="35" cy="32" rx="4" ry="8" fill="#6B7280" />
      <ellipse cx="65" cy="32" rx="4" ry="8" fill="#6B7280" />

      {/* Hocico */}
      <ellipse cx="50" cy="55" rx="12" ry="8" fill="#6B7280" />

      {/* Gafas - marcos */}
      <circle cx="42" cy="42" r="10" fill="none" stroke="#1F2937" strokeWidth="2" />
      <circle cx="58" cy="42" r="10" fill="none" stroke="#1F2937" strokeWidth="2" />

      {/* Gafas - cristales */}
      <circle cx="42" cy="42" r="8" fill="#E5E7EB" opacity="0.7" />
      <circle cx="58" cy="42" r="8" fill="#E5E7EB" opacity="0.7" />

      {/* Puente de las gafas */}
      <line x1="52" y1="42" x2="48" y2="42" stroke="#1F2937" strokeWidth="2" />

      {/* Ojos detrás de las gafas */}
      <circle cx="42" cy="42" r="3" fill="#1F2937" />
      <circle cx="58" cy="42" r="3" fill="#1F2937" />
      <circle cx="43" cy="41" r="1" fill="white" />
      <circle cx="59" cy="41" r="1" fill="white" />

      {/* Nariz */}
      <ellipse cx="50" cy="52" rx="2" ry="3" fill="#1F2937" />

      {/* Boca */}
      <path d="M 45 58 Q 50 62 55 58" stroke="#1F2937" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
