import { component$, useSignal } from '@builder.io/qwik';

export const QwikCounter = component$(() => {
  const count = useSignal(0);

  return (
    <div class="demo-card qwik-card">
      <div class="card-badge">Qwik</div>
      <div class="card-icon">🚀</div>
      <h3>Instant Counter</h3>
      <p>Zero hydration needed. This counter is interactive immediately.</p>
      <div class="counter-controls">
        <button onClick$={() => count.value--} class="btn-minus">−</button>
        <span class="count-display">{count.value}</span>
        <button onClick$={() => count.value++} class="btn-plus">+</button>
      </div>
    </div>
  );
});
