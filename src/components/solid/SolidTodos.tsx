import { createSignal, For } from 'solid-js';

export default function SolidTodos() {
  const [todos, setTodos] = createSignal([
    { id: 1, text: 'Learn Astro', done: true },
    { id: 2, text: 'Use multiple frameworks', done: false },
    { id: 3, text: 'Ship less JavaScript', done: false }
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos().map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const completedCount = () => todos().filter(t => t.done).length;

  return (
    <div class="demo-card solid-card">
      <div class="card-badge">Solid</div>
      <div class="card-icon">✅</div>
      <h3>Todo List</h3>
      <p>Fine-grained reactivity means only changed items re-render.</p>
      <div class="todo-container">
        <ul class="todo-list">
          <For each={todos()}>
            {(todo) => (
              <li 
                class={`todo-item ${todo.done ? 'done' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                <span class="checkbox">{todo.done ? '☑' : '☐'}</span>
                <span class="todo-text">{todo.text}</span>
              </li>
            )}
          </For>
        </ul>
        <div class="todo-stats">
          {completedCount()}/{todos().length} completed
        </div>
      </div>
    </div>
  );
}
