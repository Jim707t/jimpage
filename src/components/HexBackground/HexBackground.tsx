import React from 'react'

const HexBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(0,102,255,0.1), rgba(0,255,148,0.1))'
        }} />
      </div>
      <div className="hex-grid">
        <style jsx>{`
          .hex-grid {
            position: absolute;
            inset: 0;
            background-color: transparent;
            background-image: 
              linear-gradient(60deg, rgba(0,102,255,0.1) 25%, transparent 25.5%),
              linear-gradient(-60deg, rgba(0,255,148,0.1) 25%, transparent 25.5%);
            background-size: 60px 60px;
            animation: shift 10s linear infinite;
          }
          
          @keyframes shift {
            from {
              transform: translateX(0) translateY(0);
            }
            to {
              transform: translateX(60px) translateY(60px);
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default HexBackground