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
    axios.get(apiUrl).then(refreshWeather)
}

searchCity("Thohoyandou");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days= ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml="";

  
  days.forEach(function(day) {
    
    forecastHtml = forecastHtml + `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">☀️</div>
        <div class="weather-forecast-temperatures">
            <div class="weather-forecast-high-temperature">15°C</div>
            <div class="weather-forecast-low-temperature">9°C</div>
        </div>
        </div>
`;
   });

   forecastElement.innerHTML=forecastHtml;

};

displayForecast();
