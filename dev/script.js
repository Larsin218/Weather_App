var apiKey = 'cbb4cf36bc56bc375f45a088ad501544';


document.getElementById('searchBtn').addEventListener('click', function() {
    var cityName = document.querySelector('.searchBar').value;
    var locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(locationUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error('Try a different city.');
            }
            return response.json();
        })
    
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
    var cityElement = document.querySelector('.city');
    cityElement.querySelector('h2').textContent = data.name;
    cityElement.querySelector('p:nth-of-type(1)').textContent = `Temp: ${data.main.temp}°F`;
    cityElement.querySelector('p:nth-of-type(2)').textContent = `Wind: ${data.wind.speed} m/s`;
    cityElement.querySelector('p:nth-of-type(3)').textContent = `Humidity: ${data.main.humidity}%`;
}

document.getElementById('searchBtn').addEventListener('click', function() {
    var cityName = document.querySelector('.searchBar').value;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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
    var forecastDays = document.querySelectorAll('.day');
    for (let i = 0; i < 5; i++) {
        forecastDays[i].querySelector('h3').textContent = `Day ${i + 1}`;
        forecastDays[i].querySelector('p:nth-of-type(1)').textContent = `Temp: ${data.list[i * 8].main.temp}°F`;
        forecastDays[i].querySelector('p:nth-of-type(2)').textContent = `Wind: ${data.list[i * 8].wind.speed} m/s`;
        forecastDays[i].querySelector('p:nth-of-type(3)').textContent = `Humidity: ${data.list[i * 8].main.humidity}%`;
    }
}
