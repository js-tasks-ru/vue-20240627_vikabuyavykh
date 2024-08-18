import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const minValue = 1
    const maxValue = 5
    const selectedMeetupId = ref(1)
    const meetupTitle = ref('')

    function next() {
      selectedMeetupId.value++
    }

    function prev() {
      selectedMeetupId.value--
    }

    async function setTitle() {
      const meetup = await getMeetup(selectedMeetupId.value)
      meetupTitle.value = meetup.title
    }

    onMounted(setTitle)

    watch(selectedMeetupId, setTitle)

    return {
      selectedMeetupId,
      meetupTitle,
      next,
      prev,
      minValue,
      maxValue,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button @click="prev" class="button button--secondary" type="button" :disabled="selectedMeetupId == minValue">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="selectedMeetupId"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button @click="next" class="button button--secondary" type="button" :disabled="selectedMeetupId == maxValue">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>

    </div>
  `,
})
