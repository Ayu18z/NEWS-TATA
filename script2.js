const API_KEY = "f2ec4ce2154c4a83b3cde09c7ed80deb";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const iconUrl = "https://openweathermap.org/img/w/";

window.addEventListener("load", () => {
    fetchWeatherByCity("London");
});

async function fetchWeatherByCity(city) {
    const response = await fetch(`${weatherUrl}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

async function fetchWeatherByLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const response = await fetch(`${weatherUrl}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

function displayWeather(data) {
    const icon = document.getElementById("weatherIcon");
    const temperature = document.getElementById("temperature");
    const weatherDescription = document.getElementById("weatherDescription");
    const location = document.getElementById("location");
    const feelsLike = document.getElementById("feelsLike");
    const humidity = document.getElementById("humidity");

    icon.src = `${iconUrl}${data.weather[0].icon}.png`;
    temperature.textContent = data.main.temp.toFixed(1);
    weatherDescription.textContent = data.weather[0].description;
    location.textContent = `${data.name}, ${data.sys.country}`;
    feelsLike.textContent = `${data.main.feels_like.toFixed(1)}°C`;
    humidity.textContent = `${data.main.humidity}% humidity`;
}

function reload() {
    window.location.reload();
}

function leftClick() {
    const btn = document.getElementById("btn");
    btn.style.left = '0';
    window.location.href = 'index.html';
}

function rightClick() {
    const btn = document.getElementById("btn");
    btn.style.left = '110px';
    window.location.href = 'weather.html';
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function changeThemeColor(event) {
    const selectedColor = event.target.style.backgroundColor;
    document.body.style.setProperty("--theme-color", selectedColor);
}
