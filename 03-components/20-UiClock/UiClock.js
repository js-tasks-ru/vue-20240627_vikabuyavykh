import { defineComponent, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    function setTime() {
      return new Date().toLocaleString(navigator.language, { timeStyle: 'medium' })
    }

    const time = ref(setTime())

    const interval = setInterval(() => {
      time.value = setTime()
    }, 1000)

    onUnmounted(() => clearInterval(interval))

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
