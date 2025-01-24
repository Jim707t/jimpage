import React from 'react'

const CircuitOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <path d="M10 50 H40" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <path d="M60 50 H90" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
            
            {/* Vertical lines */}
            <path d="M50 10 V40" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <path d="M50 60 V90" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
            
            {/* Nodes */}
            <circle cx="50" cy="50" r="2" className="fill-blue-500" />
            <circle cx="10" cy="50" r="1.5" className="fill-green-400" />
            <circle cx="90" cy="50" r="1.5" className="fill-blue-500" />
            <circle cx="50" cy="10" r="1.5" className="fill-green-400" />
            <circle cx="50" cy="90" r="1.5" className="fill-blue-500" />
            
            {/* Diagonal connections */}
            <path d="M10 10 L40 40" stroke="currentColor" strokeWidth="0.5" className="text-green-400" />
            <path d="M60 60 L90 90" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent" />
    </div>
  )
}

export default CircuitOverlay