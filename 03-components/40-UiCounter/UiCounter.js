import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function increment(value) {
      emit('update:count', value + 1)
    }

    function decrement(value) {
      emit('update:count', value - 1)
    }
    return {
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton @click="decrement(count)" aria-label="Decrement" :disabled="count === min">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton @click="increment(count)" aria-label="Increment" :disabled="count === max">➕</UiButton>
    </div>
  `,
})
