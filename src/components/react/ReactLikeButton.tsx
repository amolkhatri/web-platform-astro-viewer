import React, { useState } from 'react';

export default function ReactLikeButton() {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(l => l + 1);
      setIsLiked(true);
      const newParticles = Array.from({ length: 6 }, (_, i) => Date.now() + i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700);
    } else {
      setLikes(l => l - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="demo-card react-card">
      <div className="card-badge">React</div>
      <div className="card-icon">💖</div>
      <h3>Animated Like Button</h3>
      <p>Click the heart to see a delightful animation with particles!</p>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px'
      }}>
        <button
          onClick={handleLike}
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '3rem',
            transition: 'transform 0.2s ease',
            transform: isLiked ? 'scale(1.2)' : 'scale(1)',
            filter: isLiked ? 'none' : 'grayscale(1)',
          }}
        >
          <span style={{
            display: 'block',
            animation: isLiked ? 'heartBeat 0.4s ease' : 'none'
          }}>
            ❤️
          </span>
          
          {particles.map((id, i) => (
            <span
              key={id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: '1rem',
                pointerEvents: 'none',
                animation: `particle${i % 6} 0.7s ease forwards`
              }}
            >
              {['✨', '💕', '⭐', '💗', '🌟', '💖'][i % 6]}
            </span>
          ))}
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: isLiked ? '#f472b6' : '#a1a1aa',
          fontWeight: 600,
          fontSize: '1.1rem',
          transition: 'color 0.3s ease'
        }}>
          <span>{likes}</span>
          <span style={{ fontSize: '0.9rem' }}>likes</span>
        </div>
      </div>

      <style>{`
        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes particle0 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-80px, -60px) scale(1); opacity: 0; }
        }
        @keyframes particle1 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(70px, -50px) scale(1); opacity: 0; }
        }
        @keyframes particle2 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-60px, 40px) scale(1); opacity: 0; }
        }
        @keyframes particle3 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(50px, 50px) scale(1); opacity: 0; }
        }
        @keyframes particle4 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-30px, -70px) scale(1); opacity: 0; }
        }
        @keyframes particle5 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(40px, -30px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
