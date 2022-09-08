//Display Current Day and Time
function formatDate(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[currentDay]}, ${currentHours}:${currentMinutes}`;
}

let appDateAndTime = document.querySelector("#current-date");
let now = new Date();

appDateAndTime.innerHTML = formatDate(now);

//City Search
function displayCity(event) {
  event.preventDefault();

  let cityPlacement = document.querySelector("#selected-city");
  let city = document.querySelector("#search-field");
  cityPlacement.innerHTML = city.value;

  function showData(response) {
    let showTemp = document.querySelector("#todaysTemp");
    let showHumidity = document.querySelector("#humidity-percent");
    let showWind = document.querySelector("#wind-info");
    let humidityInfo = response.data.main.humidity;
    let windInfo = Math.round(response.data.wind.speed * 3.6);
    let showDescription = document.querySelector("#description");
    showTemp.innerHTML = Math.round(response.data.main.temp);
    showHumidity.innerHTML = humidityInfo;
    showWind.innerHTML = windInfo;
    showDescription.innerHTML = response.data.weather[0].description;
  }

  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showData);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

function getLocation(event) {
  event.preventDefault();

  function getLatLon(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    function getPositionWeather(response) {
      console.log(response.data);
      let showTemp = document.querySelector("#todaysTemp");
      let showHumidity = document.querySelector("#humidity-percent");
      let showWind = document.querySelector("#wind-info");
      let humidityInfo = response.data.main.humidity;
      let windInfo = Math.round(response.data.wind.speed * 3.6);
      let showDescription = document.querySelector("#description");
      let cityPlacement = document.querySelector("#selected-city");
      showTemp.innerHTML = Math.round(response.data.main.temp);
      showHumidity.innerHTML = humidityInfo;
      showWind.innerHTML = windInfo;
      showDescription.innerHTML = response.data.weather[0].description;
      cityPlacement.innerHTML = response.data.name;
    }

    let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(getPositionWeather);
  }

  navigator.geolocation.getCurrentPosition(getLatLon);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

function initialData(response) {
  let showTemp = document.querySelector("#todaysTemp");
  let showHumidity = document.querySelector("#humidity-percent");
  let showWind = document.querySelector("#wind-info");
  let humidityInfo = response.data.main.humidity;
  let windInfo = Math.round(response.data.wind.speed * 3.6);
  let showDescription = document.querySelector("#description");
  let defaultCity = document.querySelector("#selected-city");
  showTemp.innerHTML = Math.round(response.data.main.temp);
  showHumidity.innerHTML = humidityInfo;
  showWind.innerHTML = windInfo;
  showDescription.innerHTML = response.data.weather[0].description;
  defaultCity.innerHTML = "Jacksonville";
}

let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Jacksonville&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(initialData);
