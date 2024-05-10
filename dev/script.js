// var searchBtn = document.querySelector('#searchBtn');
// var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

document.getElementById('searchBtn').addEventListener('click', function() {
    const cityName = document.querySelector('.searchBar').value;
    const apiKey = 'cbb4cf36bc56bc375f45a088ad501544'; // Replace 'YOUR_API_KEY' with your actual OpenWeather API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available for this city.');
            }
            return response.json();
        })
        .then(data => updateWeatherDetails(data))
        .catch(error => console.error('Error fetching weather data:', error));
});

function updateWeatherDetails(data) {
    const cityElement = document.querySelector('.city');
    cityElement.querySelector('h2').textContent = data.name;
    cityElement.querySelector('p:nth-of-type(1)').textContent = `Temp: ${data.main.temp}°C`;
    cityElement.querySelector('p:nth-of-type(2)').textContent = `Wind: ${data.wind.speed} m/s`;
    cityElement.querySelector('p:nth-of-type(3)').textContent = `Humidity: ${data.main.humidity}%`;
}

// Function to fetch and display the 5-day forecast
document.getElementById('searchBtn').addEventListener('click', function() {
    const cityName = document.querySelector('.searchBar').value;
    const apiKey = 'cbb4cf36bc56bc375f45a088ad501544'; // Same API key as before
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast data not available for this city.');
            }
            return response.json();
        })
        .then(data => updateForecastDetails(data))
        .catch(error => console.error('Error fetching forecast data:', error));
});

function updateForecastDetails(data) {
    const forecastDays = document.querySelectorAll('.day');
    for (let i = 0; i < 5; i++) {
        forecastDays[i].querySelector('h3').textContent = `Day ${i + 1}`;
        forecastDays[i].querySelector('p:nth-of-type(1)').textContent = `Temp: ${data.list[i * 8].main.temp}°C`;
        forecastDays[i].querySelector('p:nth-of-type(2)').textContent = `Wind: ${data.list[i * 8].wind.speed} m/s`;
        forecastDays[i].querySelector('p:nth-of-type(3)').textContent = `Humidity: ${data.list[i * 8].main.humidity}%`;
    }
}
