<script setup>
import Loader from './Loader.vue'
import dividerMobile from '../assets/pattern-divider-mobile.svg'
import dividerDesktop from '../assets/pattern-divider-desktop.svg'
import { onMounted, ref } from 'vue'

const props = defineProps({
  number: Number,
  text: String,
  isTranslated: Boolean
})

const emits = defineEmits(['randomize'])

// function that emits the event
const randomize = () => {
  disableButton()
  emits('randomize')
}

const isButtonDisable = ref(false)

// set a cooldown to the TranslateBtn
const disableButton = () => {
  isButtonDisable.value = true
  setTimeout(() => {
    isButtonDisable.value = false
  }, 2000)
}

const isDesktop = ref(null)

const checkWindowWidth = () => {
  if (innerWidth > 760) isDesktop.value = true
}

onMounted(() => {
  checkWindowWidth()
})
</script>

<template>
  <div class="card">
    <p v-if="!isTranslated" class="title">
      {{ number ? `ADVICE #${number}` : 'LOADING' }}
    </p>
    <p v-else class="title">
      {{ number ? `CONSEJO #${number}` : 'CARGANDO' }}
    </p>
    <p v-if="text" class="text"> “{{ text }}” </p>
    <Loader v-else />
    <img
      class="divider"
      :src="isDesktop ? dividerDesktop : dividerMobile"
      alt="divider"
    />
    <button
      class="dice-btn"
      @click="randomize"
      :class="{ disabled: isButtonDisable }"
      :disabled="isButtonDisable"
    >
      <img src="../assets/icon-dice.svg" alt="dice" />
    </button>
  </div>
</template>

<style>
.card {
  padding: 2.5em 1em 4em;
  margin: 1em;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5em;
  background-color: hsl(217, 19%, 24%);
  border-radius: 1em;
  box-shadow: 0 0 50px hsl(222, 19%, 11%);
}

.title {
  font-size: 0.7em;
  letter-spacing: 0.3em;
  font-weight: 800;
  color: hsl(150, 100%, 66%);
}

.text {
  max-width: 18ch;
  font-size: 1.4em;
  font-weight: 800;
}

.divider {
  width: 100%;
}

@media screen and (min-width: 420px) {
  .text {
    font-size: 1.7em;
  }
}

@media screen and (min-width: 560px) {
  .card {
    padding: 4em;
  }

  .title {
    font-size: 0.9em;
  }

  .text {
    max-width: 20ch;
    font-size: 2em;
  }
}

.dice-btn {
  cursor: pointer;
  position: absolute;
  transform: translate(0, 50%);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5em;
  border-radius: 100%;
  border: none;
  background-color: hsl(150, 100%, 66%);
  transition: box-shadow 0.2s ease;
}

.dice-btn:hover {
  box-shadow: 0 0 30px hsl(150, 100%, 66%);
  -webkit-tap-highlight-color: transparent;
}

.dice-btn:focus {
  outline: none;
}

.disabled {
  background-color: hsl(150, 50%, 45%) !important;
  cursor: default !important;
}

.disabled:hover {
  box-shadow: none !important;
}
</style>
