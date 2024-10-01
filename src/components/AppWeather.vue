<template>
  <div class="weather__wrapper">
    <div class="weather__desk">
      <h3 class="weather__city">{{ selectedCity }}</h3>
      <p class="weather__temperature">{{ temperature }}<span v-if="temperature">&#xb0;</span></p>
    </div>
    <div class="weather__input--wrapper">
        <input v-model="currentCity" type="text" class="weather__input"/>
        <button class="weather__button" @click="checkWeather(currentCity)">&#128269;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedCity = ref('Krasnodar');
const temperature = ref(0)

const currentCity = ref('');
const apiKey = "49dee601b64938272e7d8d6b4a796348";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function checkWeather(city: string) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    selectedCity.value = data.name;
    temperature.value = +((data.main.temp - 273.15).toFixed(1));
    currentCity.value = '';
}

checkWeather('Krasnodar');


</script>



<style scoped lang="scss">
.weather__wrapper {
  max-width: 350px;
  padding: 0 45px 20px 20px;
  margin-left: auto;
}

.weather__desk {
  display: flex;
  justify-content: space-between;
}

.weather__city {
  margin: 0;
  margin-top: 40px;
}

.weather__input--wrapper {
    display: flex;
    justify-content: space-between;
}

.weather__button {
    border-radius: 8px;
    margin-left: 5px;
}

.weather__input {
  font-size: 20px;
  width: 100%;
  border-radius: 8px;
  padding-left: 8px;
  color: grey
}

.weather__temperature {
  margin: 0;
  margin: 40px 0 5px 0;

  font-size: 30px;
  font-weight: bold;
}
</style>
