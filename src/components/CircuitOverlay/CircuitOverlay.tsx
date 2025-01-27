import React from 'react';

const CircuitOverlay: React.FC = () => (
  <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Main grid lines */}
          <path 
            d="M10 50 H40 M60 50 H90 M50 10 V40 M50 60 V90" 
            stroke="currentColor" 
            strokeWidth="0.6" 
            className="text-nebula-primary"
          />
          
          {/* Node points */}
          <circle cx="50" cy="50" r="2" className="fill-space-accent animate-pulse-slow" />
          <circle cx="10" cy="50" r="1.5" className="fill-nebula-secondary" />
          <circle cx="90" cy="50" r="1.5" className="fill-nebula-primary" />
          <circle cx="50" cy="10" r="1.5" className="fill-nebula-secondary" />
          <circle cx="50" cy="90" r="1.5" className="fill-nebula-primary" />
          
          {/* Diagonal connections */}
          <path 
            d="M10 10 L40 40 M60 60 L90 90" 
            stroke="currentColor" 
            strokeWidth="0.6" 
            className="text-space-accent"
          />
        </pattern>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-space-dark/20 to-transparent" />
  </div>
);

export default CircuitOverlay;