// // API Details 
const API_KEY = 'd8a9c794d1587dcb15c135704d8eff08';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// // event variables 
const form1 = document.querySelector('#main-form');
const form2 = document.querySelector('#form2');
const navbarCities = document.querySelector('#navbar-cities');
const tbody = document.querySelector('tbody');
const dropDown = document.querySelector('.dropdown-menu');

let fetchData = async (city) => {
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let data = await response.json();
    return data;
}

let fetchDataByPos = async (lat , lon) => {
    let response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
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
            icon = icon + 'AppIcon.png';
            break;
        case 'Fog':
            icon = icon + 'mist.png';
            break;
        default:
            icon = icon + 'AppIcon.png';
            break;
    }

    console.log(icon);

    document.querySelector('#weather-icon').setAttribute('src' , icon);
    
}

// // filling the main temperature 
let fillMainBox = (data) => {
    let main = data.main;
    let wind = data.wind;
    let clouds = data.clouds;
    let visibility = data.visibility;
    let weather = data.weather;
    let city = data.name;

    updateWeatherIcon(weather[0].main);

    document.querySelectorAll('.city-name-display').forEach((name) => {
        name.innerText = city + " ";
    })

    let temp = document.querySelector('#main-temp');
    temp.innerText = main.temp + '°C';

    document.querySelector('#wind-speed').innerText = wind.speed + ' m/s';

    document.querySelector('#humidity').innerText = main.humidity + ' g.m-3';
    
    document.querySelector('#pressure').innerText = main.pressure + ' pasc';

    document.querySelector('#min-temp').innerText = main.temp_min + '°C';

    document.querySelector('#max-temp').innerText = main.temp_max + '°C';

    document.querySelector('#feel').innerText = main.feels_like + '°C';

    document.querySelector('#wind-degree').innerText = wind.deg;

    document.querySelector('#gust').innerText = wind.gust;
}

let fillTable = (data , tr) => {
    Array.from(tr.children).forEach((row) => {
        if(row.nodeName === 'TD'){
            if(row.getAttribute('class') === 't'){
                row.innerText = data.main.temp;
            }else if(row.getAttribute('class') === 'h'){
                row.innerText = data.main.humidity;
            }
            else{
                row.innerText = data.wind.speed;
            }
        }
    })
}

window.addEventListener('load' ,() => {

    Array.from(tbody.children).forEach((tr) => {
            let city = tr.getAttribute('id');
            fetchData(city).then(data => {
                fillTable(data , tr);
            }).catch(error => {
                console.log(error);
                console.log('There was an error');
            })
        })
        
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
        
                fetchDataByPos(lat , long).then(data => {
                    fillMainBox(data);
                }).catch(error => {
                    console.log(error);
                })
        
                console.log(lat,long)
            })
        }
})

// // handling the search event 
form1.addEventListener('submit' , (event) => {
    event.preventDefault();

    let city = form1.citySearch.value;

    fetchData(city).then(data => {
        fillMainBox(data);
    }).catch(error => {
        console.log(error);
        console.log('There was an error');
    })

    form1.citySearch.value = '';
    
});

form2.addEventListener('submit' , (event) => {
    event.preventDefault();

    let city = form2.citySearch2.value;

    fetchData(city).then(data => {
        fillMainBox(data);
    }).catch(error => {
        console.log(error);
        console.log('There was an error');
    })

    form2.citySearch2.value = '';
    
});

navbarCities.addEventListener('click' , (event) => {
    let target = event.target;

    console.log(target.classList);
    if(!target.classList.contains('dropdown-toggle') && target.nodeName === 'A' && !target.classList.contains('dropdown-item')){
        let city = target.innerText;

        fetchData(city).then(data => {
            fillMainBox(data);
        }).catch(error => {
            console.log(error);
            console.log('There was an error');
        })
    }
})

let dropDownEvent = (city) => {
    fetchData(city).then(data => {
        fillMainBox(data);
    }).catch(err => {
        console.log(err);
    })
}




