import React, { useState } from 'react';

export default function ReactMood() {
  const [mood, setMood] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const moods = [
    { emoji: '😴', label: 'Sleepy', color: '#6366f1' },
    { emoji: '😊', label: 'Happy', color: '#34d399' },
    { emoji: '🤩', label: 'Excited', color: '#fbbf24' },
    { emoji: '🚀', label: 'Productive', color: '#61dafb' },
    { emoji: '🔥', label: 'On Fire!', color: '#f87171' },
  ];

  const handleMoodChange = (index: number) => {
    setMood(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const bgColor = moods[mood].color;

  return (
    <div className="demo-card react-card">
      <div className="card-badge">React</div>
      <div className="card-icon">🎭</div>
      <h3>Mood Selector</h3>
      <p>How are you feeling today? Select your current mood!</p>
      
      <div style={{
        background: `linear-gradient(135deg, ${bgColor}22, ${bgColor}11)`,
        border: `2px solid ${bgColor}44`,
        borderRadius: '16px',
        padding: '1.5rem',
        transition: 'all 0.4s ease'
      }}>
        <div style={{
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '1rem',
          transform: isAnimating ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {moods[mood].emoji}
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: bgColor,
          marginBottom: '1.5rem'
        }}>
          {moods[mood].label}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => handleMoodChange(i)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: mood === i ? `2px solid ${m.color}` : '2px solid transparent',
                background: mood === i ? `${m.color}33` : 'rgba(255,255,255,0.1)',
                fontSize: '1.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: mood === i ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
