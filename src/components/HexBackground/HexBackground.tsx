import React from 'react';

const HexBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-space-dark">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(165, 180, 252, 0.1))'
        }} />
      </div>
      <div className="hex-grid">
        <style jsx>{`
          .hex-grid {
            position: absolute;
            inset: 0;
            background-color: transparent;
            background-image: 
              linear-gradient(60deg, rgba(79, 70, 229, 0.1) 25%, transparent 25.5%),
              linear-gradient(-60deg, rgba(99, 102, 241, 0.1) 25%, transparent 25.5%);
            background-size: 60px 60px;
            animation: shift 15s linear infinite;
            will-change: transform;
          }
          
          @keyframes shift {
            from { transform: translateX(0) translateY(0); }
            to { transform: translateX(60px) translateY(60px); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.15; }
          }

          .hex-grid::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%);
            animation: pulse 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default HexBackground;