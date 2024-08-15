import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)
    const minValue = 0
    const maxValue = 5

    function increment() {
      count.value++
    }

    function decrement() {
      count.value--
    }

    return {
      count,
      minValue,
      maxValue,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        @click="decrement"
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="count === minValue"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        @click="increment"
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="count === maxValue"
      >➕</button>
    </div>
  `,
})
