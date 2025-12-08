import { createSignal, onMount, onCleanup } from 'solid-js';

export default function SolidProgress() {
  const [progress, setProgress] = createSignal(0);
  const [isRunning, setIsRunning] = createSignal(true);

  onMount(() => {
    const timer = setInterval(() => {
      if (isRunning()) {
        setProgress(p => (p >= 100 ? 0 : p + 2));
      }
    }, 50);
    onCleanup(() => clearInterval(timer));
  });

  return (
    <div class="demo-card solid-card">
      <div class="card-badge">Solid</div>
      <div class="card-icon">⚡</div>
      <h3>Reactive Progress</h3>
      <p>SolidJS updates the DOM surgically without a Virtual DOM.</p>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style={{ width: `${progress()}%` }}></div>
        </div>
        <div class="progress-info">
          <span>{progress()}%</span>
          <button 
            onClick={() => setIsRunning(!isRunning())}
            class="control-btn"
          >
            {isRunning() ? '⏸ Pause' : '▶ Play'}
          </button>
        </div>
      </div>
    </div>
  );
}
