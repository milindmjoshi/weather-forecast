console.log("hello, main");
var searchCity = document.querySelector(".city-name");
var searchButton = document.querySelector(".btn");
var cityNameDate = document. querySelector("#city-name-display");
var cityTempDisplay = document. querySelector("#city-temp-display");
var cityWind = document. querySelector(".city-wind");
var cityHumidity = document. querySelector(".city-humidity");
var weatherimg = document.querySelector("#weatherimg");
var savedCitiesEl = document.querySelector(".saved-cities");
var message = document.querySelector(".message");

//get day1 elements 
var day1Date = document. querySelector(".day1-date");
var day1Img = document. querySelector(".day1-weatherimg");
var day1CityTemp = document. querySelector(".day1-city-temp");
var day1CityWind = document. querySelector(".day1-city-wind");
var day1CityHumidity = document. querySelector(".day1-city-humidity");
var day1Weatherimg = document.querySelector("#day1-weatherimg");
//get day2 elements 
var day2Date = document. querySelector(".day2-date");
var day2Img = document. querySelector(".day2-weatherimg");
var day2CityTemp = document. querySelector(".day2-city-temp");
var day2CityWind = document. querySelector(".day2-city-wind");
var day2CityHumidity = document. querySelector(".day2-city-humidity");
var day2Weatherimg = document.querySelector("#day2-weatherimg");
//get day3 elements 
var day3Date = document. querySelector(".day3-date");
var day3Img = document. querySelector(".day3-weatherimg");
var day3CityTemp = document. querySelector(".day3-city-temp");
var day3CityWind = document. querySelector(".day3-city-wind");
var day3CityHumidity = document. querySelector(".day3-city-humidity");
var day3Weatherimg = document.querySelector("#day3-weatherimg");
//get day4 elements 
var day4Date = document. querySelector(".day4-date");
var day4Img = document. querySelector(".day4-weatherimg");
var day4CityTemp = document. querySelector(".day4-city-temp");
var day4CityWind = document. querySelector(".day4-city-wind");
var day4CityHumidity = document. querySelector(".day4-city-humidity");
var day4Weatherimg = document.querySelector("#day4-weatherimg");
//get day5 elements 
var day5Date = document. querySelector(".day5-date");
var day5Img = document. querySelector(".day5-weatherimg");
var day5CityTemp = document. querySelector(".day5-city-temp");
var day5CityWind = document. querySelector(".day5-city-wind");
var day5CityHumidity = document. querySelector(".day5-city-humidity");
var day5Weatherimg = document.querySelector("#day5-weatherimg");

// Load data from local storage if exists
var savedCities = localStorage.getItem("Cities");
if (savedCities == null){ savedCities = "";}
console.log("On load, cities saved is: " + savedCities);
var cityArray = savedCities.split(":");
cityArray.forEach((city)=> {
    if (city.trim() != ""){
        createCityButton(city);
    }
        console.log(city)
});


// Add handler to fetch city data on click
searchButton.addEventListener('click',(e)=> {
    e.preventDefault();
    var city = searchCity.value;
    //alert(city);
    fetchCityWeather(city);
    searchCity.value = "";
    searchCity.focus();
    
});

function getCityWeather(event){
    var button = event.target;
    var city = button.textContent;
    fetchCityWeather(city);
}

function createCityButton(city){
    var newbutton =document.createElement("button");
    newbutton.textContent = city;
    newbutton.classList.add("citybtn");
    newbutton.addEventListener('click', getCityWeather);
    savedCitiesEl.appendChild(newbutton);
}


//var api = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`"

var tampa = "https://api.openweathermap.org/data/2.5/forecast?lat=27.964157&lon=-82.452606&appid=c1e8ac23970e9332cf4800d78f376d1a";

//by city
var bycity = "https://api.openweathermap.org/data/2.5/forecast?q="

//TODO: add to secret
var appId = "&appid=c1e8ac23970e9332cf4800d78f376d1a&units=imperial";

// var icon = "https://openweathermap.org/img/wn/10d@2x.png";
var icon = "https://openweathermap.org/img/wn/"
var iconSuffix = "@2x.png";

// weather api returns 40 entries 7 per day in 3 hour increments so
// list[0] = next day , list[7] is day 1, list[14] is day 2, list[21] is day3 , list[28] is day4 and list[35]
// is day 5
// fetch weather
function fetchCityWeather(city){
    console.log("Getting weather for: " + city);
    fetch(bycity + city + appId)
    .then(function(response){
        console.log(response.status);
        if (response.status === 200){
            hideMessage();
            return response.json();
        }
        else{    
            console.log("City not found");
            showMessage("City " + city + " Not Found");
        }
    })
    .then(function response(data){
        console.log(data);
        if (data != undefined){
            setCityData(data);
            hideMessage();
            if (savedCities.indexOf(city) == -1){
                savedCities = savedCities.concat(city + ":");
                console.log("saved cities: " + savedCities);
                localStorage.setItem("Cities",savedCities);
                createCityButton(city);
            }
        }
    });
}

// show message at top if search city not found
function showMessage(text){
    console.log("show message: " + text);
    message.innerHTML = text;
    //message.style.visibility = 'visible';
}

// hide city not found message
function hideMessage(){
    console.log("hide message");
    console.log(message);
    message.innerHTML='';
}

function setCityData(data){

    // set main forecast
    console.log(cityNameDate);
    var dt = dayjs(data.list[0].dt_txt).format("(MM/DD/YYYY)");
    cityNameDate.innerHTML = data.city.name + " " + dt;
    cityTempDisplay.innerHTML = "Temp: " + data.list[0].main.temp + "&deg;F";
    cityWind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
    cityHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    fetchCityWeatherIcon(data,0);

    // set 5 day forecast
    var dt1 = dayjs(data.list[7].dt_txt).format("MM/DD/YYYY");
    day1Date.textContent = dt1;
    day1CityTemp.innerHTML = "Temp: " + data.list[7].main.temp + "&deg;F";
    day1CityWind.textContent = "Wind: " + data.list[7].wind.speed + " mph";
    day1CityHumidity.textContent = "Humidity: " + data.list[7].main.humidity + "%";
    fetchCityWeatherIcon(data,7);

    var dt2 = dayjs(data.list[15].dt_txt).format("MM/DD/YYYY");
    day2Date.textContent = dt2;
    day2CityTemp.innerHTML = "Temp: " + data.list[15].main.temp + "&deg;F";
    day2CityWind.textContent = "Wind: " + data.list[15].wind.speed + " mph";
    day2CityHumidity.textContent = "Humidity: " + data.list[15].main.humidity + "%";
    fetchCityWeatherIcon(data,15);

    var dt3 = dayjs(data.list[23].dt_txt).format("MM/DD/YYYY");
    day3Date.textContent = dt3;
    day3CityTemp.innerHTML = "Temp: " + data.list[23].main.temp + "&deg;F";
    day3CityWind.textContent = "Wind: " + data.list[23].wind.speed + " mph";
    day3CityHumidity.textContent = "Humidity: " + data.list[23].main.humidity + "%";
    fetchCityWeatherIcon(data,23);

    var dt4 = dayjs(data.list[31].dt_txt).format("MM/DD/YYYY");
    day4Date.textContent = dt4;
    day4CityTemp.innerHTML = "Temp: " + data.list[31].main.temp + "&deg;F";
    day4CityWind.textContent = "Wind: " + data.list[31].wind.speed + " mph";
    day4CityHumidity.textContent = "Humidity: " + data.list[31].main.humidity + "%";
    fetchCityWeatherIcon(data,31);

    var dt5 = dayjs(data.list[39].dt_txt).format("MM/DD/YYYY");
    day5Date.textContent = dt5;
    day5CityTemp.innerHTML = "Temp: " + data.list[39].main.temp + "&deg;F";
    day5CityWind.textContent = "Wind: " + data.list[39].wind.speed + " mph";
    day5CityHumidity.textContent = "Humidity: " + data.list[39].main.humidity + "%";
    fetchCityWeatherIcon(data,39);
}

function fetchCityWeatherIcon(data,index){
    var cityIconCode = data.list[index].weather[0].icon;
    console.log("icon code: " + cityIconCode);
    // fetch current
    fetch(icon + cityIconCode + iconSuffix)
        .then(function(response){
            console.log(response.status);
            return response.blob();
        })
        .then(function response(data){
            var imageURL = URL.createObjectURL(data);
            console.log(imageURL);
            if (index === 0){
                weatherimg.setAttribute("src",imageURL);
            }
            else if (index === 7){
                day1Weatherimg.setAttribute("src",imageURL);
            }
            else if (index === 15){
                day2Weatherimg.setAttribute("src",imageURL);
            }
            else if (index === 23){
                day3Weatherimg.setAttribute("src",imageURL);
            }
            else if (index === 31){
                day4Weatherimg.setAttribute("src",imageURL);
            }
            else if (index === 39){
                day5Weatherimg.setAttribute("src",imageURL);
            }
        }
        );
}