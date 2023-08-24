<script setup>
import { onMounted, reactive } from 'vue'
import AdviceCard from './components/AdviceCard.vue'
import TranslateButton from './components/TranslateButton.vue'
import { translateText } from './services/textTranslator'
import { fetchAdvice } from './services/adviceSlip'

const state = reactive({
  id: 0,
  advice: null,
  englishText: null,
  spanishText: null,
  isTranslated: null
})

// render advice Data
const showAdvice = async () => {
  state.spanishText = null
  state.id = 0
  state.advice = null
  state.isTranslated = JSON.parse(localStorage.getItem('translate'))

  const adviceObject = await fetchAdvice()
  const adviceText = adviceObject.slip.advice
  state.englishText = adviceText
  if (state.isTranslated) {
    // translate and assign spanish text
    handleTranslate(adviceText).then(() => {
      state.id = adviceObject.slip.id
    })
    return
  }
  // assign english text
  state.id = adviceObject.slip.id
  state.advice = adviceObject.slip.advice
}

// controls whether or not translations are enabled
const handleTranslate = async text => {
  state.isTranslated = JSON.parse(localStorage.getItem('translate'))
  if (state.isTranslated) {
    if (state.spanishText) {
      state.advice = state.spanishText
      return
    }
    state.advice = await translateText(text)
    state.spanishText = state.advice
    return
  }
  if (state.englishText) state.advice = state.englishText
}

onMounted(() => {
  showAdvice()
})
</script>

<template>
  <TranslateButton @languageChange="handleTranslate(state.advice)">
    {{ state.isTranslated ? 'ES' : 'EN' }}
  </TranslateButton>
  <Transition name="bounce" appear>
    <AdviceCard
      :number="state.id"
      :text="state.advice"
      :isTranslated="state.isTranslated"
      @randomize="showAdvice"
    />
  </Transition>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background-color: hsl(218, 23%, 16%);
  color: hsl(193, 38%, 86%);
  font-family: 'Manrope', sans-serif;
}

button,
a {
  font-family: inherit;
  color: inherit;
}

#app {
  display: grid;
  place-items: center;
  height: 100%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
