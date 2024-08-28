import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherCard from './components/WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard,
  },

  setup() {
    const cards = getWeatherData()

    function getIcon(id) {
      return WeatherConditionIcons[id]
    }

    function tempConverter(temp) {
      return (temp - 273.15).toFixed(1)
    }

    function pressureConverter(pressure) {
      return Math.round(pressure * 0.75)
    }

    function isNightTheme({ currentTime, sunriseTime, sunsetTime }) {
      return currentTime < sunriseTime || sunsetTime < currentTime
    }

    return {
      cards,
      getIcon,
      tempConverter,
      pressureConverter,
      isNightTheme,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <WeatherCard
          v-for="card in cards"
          :name="card.geographic_name"
          :alert="card.alert"
          :current-time="card.current.dt"
          :icon="getIcon(card.current.weather.id)"
          :icon-title="card.current.weather.description"
          :temp="tempConverter(card.current.temp)"
          :pressure="pressureConverter(card.current.pressure)"
          :humidity="card.current.humidity"
          :clouds="card.current.clouds"
          :wind="card.current.wind_speed"
          :is-night-theme="isNightTheme({ currentTime: card.current.dt, sunriseTime: card.current.sunrise, sunsetTime: card.current.sunset })"
        />
      </ul>
    </div>
  `,
})
