const apiKey = "b86fd8f7708187a762619d1377a88ec7";

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Request API to fetch data by city
async function getWeatherByCity(city) {
  const resp = await fetch(url(city));

  const respData = await resp.json();

  console.log(respData, KtoC(respData.main.temp));

  addWeatherToPage(respData);
}
// Display data on the input html
function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h5>${data.name}</h5>
    <p>${data.sys.country}</p>
    
    <h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>${temp} °C
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
    <small>${data.weather[0].main}</small>
  `;

  // Cleanup
  main.innerHTML = "";

  main.appendChild(weather);
}

// Transform Farenheit to Degree function
function KtoC(K) {
  return Math.floor(K - 273.15);
}
// Send user city search
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeatherByCity(city);
  }
  search.value = "";
});
