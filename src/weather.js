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
}

function searchCity(city) {
    let apiKey = "3aa7ceoceb04ta4430a8733bf6be036f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather)
}

searchCity("Cape Town")

