function searchNewCity(event) {
  event.preventDefault();
  let apiKey = "c38aae96bba5ad62c759359a5ab40a9d";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let city = document.querySelector("#city-input").value;
  let unit = "metric";
  axios
    .get(`${apiUrl}${city}&appid=${apiKey}&units=${unit}`)
    .then(showTemperature);
}
function showTemperature(response) {
  let temperatureElement = document.querySelector(".currentTemperature");
  let currentTemperature = Math.round(response.data.main.temp);
  console.log(currentTemperature);
  console.log(response.data);
  temperatureElement.innerHTML = `${currentTemperature}ºC`;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#country-name").innerHTML = response.data.sys.country;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
}

function searchLocation(position) {
  let apiKey = "c38aae96bba5ad62c759359a5ab40a9d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector(".btn");
searchButton.addEventListener("click", searchNewCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let monthDay = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let currentDate = `${day}, <strong>${month} ${monthDay}</strong>, ${hours}:${minutes}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = currentDate;
