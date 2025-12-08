<template>
  <div class="demo-card vue-card">
    <div class="card-badge">Vue</div>
    <div class="card-icon">💚</div>
    <h3>Reactive Toggle</h3>
    <p>Vue's reactivity system powers this component seamlessly.</p>
    <div class="toggle-container">
      <button @click="isDark = !isDark" class="toggle-btn" :class="{ active: isDark }">
        <span class="toggle-icon">{{ isDark ? '🌙' : '☀️' }}</span>
        <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
      </button>
      <div class="preview-box" :class="{ dark: isDark }">
        Preview Area
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isDark = ref(true);
</script>

<style scoped>
.toggle-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #42b883;
  background: transparent;
  color: #e2e2e2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: #42b883;
  color: #000;
}

.toggle-icon {
  font-size: 1.2rem;
}

.preview-box {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  background: #fff;
  color: #000;
}

.preview-box.dark {
  background: #1a1a2e;
  color: #fff;
}
</style>

