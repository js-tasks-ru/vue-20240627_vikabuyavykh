import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const data = getWeatherData()

    function tempConverter(temp) {
      const convertedTemp = (temp - 273.15).toFixed(1)
      return convertedTemp
    }

    function pressureConverter(pressure) {
      const convertedPressure = Math.round(pressure * 0.75)
      return convertedPressure
    }

    function pickIcon(id) {
      const icon = WeatherConditionIcons[id]
      return icon
    }

    function isNightTheme({ dt: currentTime, sunrise: sunriseTime, sunset: sunsetTime }) {
      return currentTime < sunriseTime || sunsetTime < currentTime
    }

    return {
      data,
      tempConverter,
      pressureConverter,
      pickIcon,
      isNightTheme,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li v-for="item in data" class="weather-card" :class="{'weather-card--night': isNightTheme({dt: item.current.dt, sunrise: item.current.sunrise, sunset:item.current.sunset })}">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{ pickIcon(item.current.weather.id) }}</div>
            <div class="weather-conditions__temp">{{ tempConverter(item.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureConverter(item.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
