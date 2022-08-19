<script setup>
import { onMounted, ref } from 'vue'
const emits = defineEmits(['languageChange'])

const isActive = ref(null)

// save lang preference and emit event to parent
const changeLang = () => {
  isActive.value = !isActive.value
  localStorage.setItem('translate', JSON.stringify(isActive.value))
  emits('languageChange')
}

onMounted(() => {
  isActive.value = JSON.parse(localStorage.getItem('translate'))
})
</script>

<template>
  <button :class="{ active: isActive }" @click="changeLang">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 10px;
  background-color: hsl(217, 19%, 24%);
  color: hsl(150, 100%, 66%);
  font-weight: 800;
  font-size: 1em;
  position: absolute;
  bottom: 1em;
  right: 1em;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

button:hover {
  box-shadow: 0 0 20px hsl(216, 9%, 31%);
}

button:focus {
  outline: none;
}

.active {
  background-color: hsl(150, 100%, 66%);
  color: hsl(218, 23%, 16%);
}

.active:hover {
  box-shadow: 0 0 20px hsl(150, 100%, 66%);
}
</style>
