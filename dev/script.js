var apiKey = 'cbb4cf36bc56bc375f45a088ad501544';

function updateWeatherDetails(data) {
    var city = document.querySelector('#city');
    city.querySelector('h2').textContent = data.name;
    city.querySelector('#cityTemp').textContent = `Temp: ${data.main.temp}°F`;
    city.querySelector('#cityWind').textContent = `Wind: ${data.wind.speed} m/s`;
    city.querySelector('#cityHumidity').textContent = `Humidity: ${data.main.humidity}%`;
}

function updateForecastDetails(data) {
    var forecast = document.querySelectorAll('.day');
    for (let i = 0; i < 5; i++) {
        forecast[i].querySelector('h3').textContent = `Day ${i + 1}`;
        forecast[i].querySelector('.dayTemp').textContent = `Temp: ${data.list[i * 8].main.temp}°F`;
        forecast[i].querySelector('.dayWind').textContent = `Wind: ${data.list[i * 8].wind.speed} m/s`;
        forecast[i].querySelector('.dayHumidity').textContent = `Humidity: ${data.list[i * 8].main.humidity}%`;
    }
}


function fetchWeatherData(cityName) {
    var locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(locationUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Try a different city.');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherDetails(data);
            var { lat, lon } = data.coord;
            return fetchForecastData(lat, lon);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchForecastData(lat, lon) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast data not available for this city.');
            }
            return response.json();
        })
        .then(data => updateForecastDetails(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

document.getElementById('searchBtn').addEventListener('click', function() {
    var cityName = document.querySelector('.searchBar').value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
    } else {
        console.error('Please enter a city name.');
    }
});