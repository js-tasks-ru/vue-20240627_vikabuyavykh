import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref('')
    const secondOperand = ref('')
    const operator = ref('')

    const result = computed(() => {
      if (firstOperand.value && secondOperand.value) {
        if (operator.value === 'sum') {
          return firstOperand.value + secondOperand.value
        } else if (operator.value === 'subtract') {
          return firstOperand.value - secondOperand.value
        } else if (operator.value === 'multiply') {
          return firstOperand.value * secondOperand.value
        } else if (operator.value === 'divide') {
          if (secondOperand.value === 0) {
            return 'Деление на ноль недопустимо'
          }
          return firstOperand.value / secondOperand.value
        }
        return ''
      }
      return ''
    })

    return {
      firstOperand,
      secondOperand,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
