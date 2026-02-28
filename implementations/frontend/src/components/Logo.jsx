function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="40" height="40" rx="10" fill="#0F172A"/>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="travelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" /> {/* Cyan */}
          <stop offset="100%" stopColor="#F59E0B" /> {/* Gold */}
        </linearGradient>
      </defs>

      {/* Location Pin Shape */}
      <path 
        d="M20 32C20 32 12 24 12 18C12 13.5817 15.5817 10 20 10C24.4183 10 28 13.5817 28 18C28 24 20 32 20 32Z" 
        stroke="url(#travelGradient)" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />

      {/* Minimal Airplane Shape */}
      <path 
        d="M17 17L21 15L25 17L23 19L21 23L19 19L17 17Z" 
        fill="url(#travelGradient)"
      />
      
      {/* Decorative Flight Trail */}
      <path 
        d="M14 22Q16 20 20 18" 
        stroke="#22D3EE" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeDasharray="2 2"
      />
    </svg>
  )
}

export default Logo