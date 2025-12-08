<template>
  <div class="demo-card vue-card">
    <div class="card-badge">Vue</div>
    <div class="card-icon">🎯</div>
    <h3>Live Search</h3>
    <p>Vue's v-model makes two-way binding effortless.</p>
    <div class="search-container">
      <input 
        v-model="search" 
        placeholder="Search frameworks..."
        class="search-input"
      />
      <ul class="results-list">
        <li v-for="item in filteredItems" :key="item" class="result-item">
          {{ item }}
        </li>
        <li v-if="filteredItems.length === 0" class="no-results">
          No results found
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const items = ['React', 'Vue', 'Solid', 'Svelte', 'Qwik', 'Angular', 'Preact'];

const filteredItems = computed(() => {
  if (!search.value) return items;
  return items.filter(item => 
    item.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.search-input {
  padding: 0.75rem;
  border: 1px solid #42b883;
  background: #16161e;
  color: #fff;
  border-radius: 8px;
  outline: none;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.3);
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.result-item {
  padding: 0.4rem 0.75rem;
  background: rgba(66, 184, 131, 0.15);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #42b883;
}

.no-results {
  color: #666;
  font-size: 0.9rem;
}
</style>

