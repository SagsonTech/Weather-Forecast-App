// API Details 
const API_KEY = 'd8a9c794d1587dcb15c135704d8eff08';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// event variables 
const form = document.querySelector('form');

let fetchData = async (city) => {
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let data = await response.json();
    return data;
}

// updating weather icon 
let updateWeatherIcon = (main) => {
    let icon = '/Weather-Forecast-App/Images/';

    switch(main){
        case 'Clear':
            icon = icon + 'sun.png';
            break;
        case 'Rain':
            icon = icon + 'rain.png';
            break;
        case 'Mist':
            icon = icon + 'mist.png';
            break;
        case 'Snow':
            icon = icon + 'snowflake.png';
            break;
        case 'Thunderstrom':
            icon = icon + 'thunderstrom.png';
            break;
        case 'Clouds':
            icon = icon + 'cloudy.png';
            break;
        case 'Fog':
            icon = icon + 'mist.png';
            break;
        default:
            icon = icon + 'cloudy.png';
            break;
    }

    console.log(icon);

    let image = document.querySelector('#weather-icon').setAttribute('src' , icon);
}

// filling the main temperature 
let fillMainBox = (data) => {
    let main = data.main;
    let wind = data.wind;
    let clouds = data.clouds;
    let visibility = data.visibility;
    let weather = data.weather;
    let city = data.name;

    updateWeatherIcon(weather[0].main);

    document.querySelector('#city-name-display').innerText = city;

    let temp = document.querySelector('#main-temp');
    temp.innerText = main.temp + '°C';

    document.querySelector('#wind-speed').innerText = wind.speed + ' m/s';

    document.querySelector('#humidity-val').innerText = main.humidity + ' g.m-3';
    
    document.querySelector('#pressure-val').innerText = main.pressure + ' pasc';

    document.querySelector('#min-temp').innerText = main.temp_min + '°C';

    document.querySelector('#max-temp').innerText = main.temp_max + '°C';

    document.querySelector('#feel').innerText = main.feels_like + '°C';

    document.querySelector('#clouds').innerText = clouds.all;

    document.querySelector('#weather').innerText = weather[0].main;

    document.querySelector('#vis').innerText = visibility;

    console.log(main);
    console.log(wind);
    console.log(clouds);
    console.log(visibility);
    console.log(weather);

}

window.addEventListener('load' ,() => {
    fetchData('Chennai').then(data => {
        let main = data.main;
        
        fillMainBox(data);

    }).catch(error => {
        console.log(error);
    })
})

// handling the search event 
form.addEventListener('submit' , (event) => {
    event.preventDefault();

    let city = form.city.value;

    fetchData(city).then(data => {
        fillMainBox(data);
    }).catch(error => {
        console.log('There was an error');
    })

    form.city.value = '';
    
})


