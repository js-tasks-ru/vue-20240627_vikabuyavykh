import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
  },

  props: {
    name: String,
    alert: [null, Object],
    currentTime: String,
    icon: String,
    iconTitle: String,
    temp: String,
    pressure: Number,
    humidity: Number,
    clouds: Number,
    wind: Number,
    isNightTheme: Boolean,
  },

  template: `
    <li class="weather-card" :class="{ 'weather-card--night': isNightTheme }">
      <WeatherAlert v-if="alert" :sender="alert.sender_name" :description="alert.description" />
      <div>
        <h2 class="weather-card__name">
          {{ name}}
        </h2>
        <div class="weather-card__time">
          {{ currentTime }}
        </div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="iconTitle">{{ icon }}</div>
        <div class="weather-conditions__temp">{{ temp }} °C</div>
      </div>
      <div class="weather-details">
        <div class="weather-details__item">
          <div class="weather-details__item-label">Давление, мм рт. ст.</div>
          <div class="weather-details__item-value">{{ pressure }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Влажность, %</div>
          <div class="weather-details__item-value">{{ humidity }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Облачность, %</div>
          <div class="weather-details__item-value">{{ clouds }}</div>
        </div>
        <div class="weather-details__item">
          <div class="weather-details__item-label">Ветер, м/с</div>
          <div class="weather-details__item-value">{{ wind }}</div>
        </div>
      </div>
    </li>
  `,
})
