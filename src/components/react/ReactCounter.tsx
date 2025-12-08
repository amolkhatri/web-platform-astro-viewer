import React, { useState } from 'react';

export default function ReactCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-card react-card">
      <div className="card-badge">React</div>
      <div className="card-icon">⚛️</div>
      <h3>Interactive Counter</h3>
      <p>This React island hydrates independently. Click to interact!</p>
      <div className="counter-controls">
        <button onClick={() => setCount(c => c - 1)} className="btn-minus">−</button>
        <span className="count-display">{count}</span>
        <button onClick={() => setCount(c => c + 1)} className="btn-plus">+</button>
      </div>
    </div>
  );
}
