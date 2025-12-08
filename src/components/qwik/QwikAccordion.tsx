import { component$, useSignal } from '@builder.io/qwik';

export const QwikAccordion = component$(() => {
  const openIndex = useSignal<number | null>(null);
  
  const items = [
    { title: 'What is Resumability?', content: 'Qwik serializes the application state to HTML. When users interact, it resumes exactly where the server left off.' },
    { title: 'Why Zero JS?', content: 'Qwik lazy-loads JavaScript only when needed, resulting in near-instant interactivity regardless of app size.' },
    { title: 'How does it work?', content: 'Event handlers are serialized as HTML attributes. Qwik loads only the code needed for the specific interaction.' }
  ];

  return (
    <div class="demo-card qwik-card">
      <div class="card-badge">Qwik</div>
      <div class="card-icon">📖</div>
      <h3>FAQ Accordion</h3>
      <p>Each click loads only the necessary code.</p>
      <div class="accordion">
        {items.map((item, i) => (
          <div key={i} class="accordion-item">
            <button 
              onClick$={() => openIndex.value = openIndex.value === i ? null : i}
              class={`accordion-header ${openIndex.value === i ? 'open' : ''}`}
            >
              <span>{item.title}</span>
              <span class="accordion-icon">{openIndex.value === i ? '−' : '+'}</span>
            </button>
            {openIndex.value === i && (
              <div class="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
