function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput=document.querySelector("#search-input");
     let cityElement=document.querySelector("#city");
     cityElement.innerHTML=searchInput.value;
     searchCity(searchInput.value);
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function refreshWeather(response){
    console.log(response);
let temperatureElement = document.querySelector("#weather-app-temperature");
   let cityElement = document.querySelector("#city");
    let temperature = Math.round(response.data.temperature.current);
    let city=response.data.city;
    cityElement.innerHTML=city;
    temperatureElement.innerHTML=`${temperature}<sub class="temperature-unit">°C</sub>`;

     let descriptionElement = document.querySelector("#description");
     let humidityElement = document.querySelector("#humidity");
     let windSpeedElement=document.querySelector("#wind-speed")
     descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML=`${response.data.wind.speed} km/h`;

    let timeElement=document.querySelector("#time");
    let date=new Date(response.data.time*1000);
    timeElement.innerHTML=formatDate(date);

    let emojiElement=document.querySelector("#emoji");
    emojiElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="weather-app-emoji" />`;
     
    getForecast(response.data.city);
  }

function formatDate(date) {
    let minutes=date.getMinutes();
    let hours=date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day=days[date.getDay()];

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "3aa7ceoceb04ta4430a8733bf6be036f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);

    getForecast(city);
}

searchCity("Thohoyandou");

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3aa7ceoceb04ta4430a8733bf6be036f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-high-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-low-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast(response);
