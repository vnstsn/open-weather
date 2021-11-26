// get the DOM elements
let apikey = 'insert your api key here';
const cityInput = document.querySelector('#city-input');
const btnSearch = document.querySelector('#btn-search');
const cityBloc = document.querySelector('#city-bloc');
const containerInfo = document.querySelector('.container-info');

btnSearch.addEventListener('click', fetchWeather);

function fetchWeather () {
  let city = cityInput;
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+apikey+'';
  cityBloc.innerHTML = "";
  fetch(url)
  // call api 
    .then(response => response.json())
    // recup infos
    .then((value) => {
      console.log(value);
      return value;
    })
    // call method loop
    .then(blocLoop);
}


// function to show infos 
function blocLoop(value) {
    let cityName = document.createElement('h3');
    cityBloc.append(cityName);
    cityName.textContent = value.city.name;

    let cityLat = document.createElement('p');
    cityBloc.append(cityLat);
    cityLat.textContent = 'Latitude : ' + value.city.coord.lat;

    let cityLon = document.createElement('p');
    cityBloc.append(cityLon);
    cityLon.textContent = 'Longitude : ' + value.city.coord.lon;
    
    let infoBloc = document.createElement('div');
    infoBloc.id = "info-bloc";
    containerInfo.append(infoBloc);
  // loop on the list
  for(let i = 0; i < value.list.length; i++) {
    console.log(value.list.length);
    // break if i = 5 
    //if (i > 10) break;
    // create a div to contain the infos
    let infoCard = document.createElement('div');
    infoCard.id = "info-card";
    infoBloc.append(infoCard);
    let date = document.createElement('p');
    infoCard.append(date);
    date.textContent = value.list[i].dt_txt;

    let temp = document.createElement('p');
    infoCard.append(temp);
    temp.textContent = Math.round(((value.list[i].main.temp) - 273.15)) + '°C';

    let weather = document.createElement('p');
    infoCard.append(weather);
    weather.textContent = value.list[i].weather[0].description;
    
    let img = value.list[i].weather[0].icon;
    let icon = document.createElement('img');
    icon.src = 'http://openweathermap.org/img/wn/'+ img+'.png';
    infoCard.append(icon);

     
  } 
}

