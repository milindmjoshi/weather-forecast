console.log("hello, main");
var searchCity = document.querySelector(".city-name");
var searchButton = document.querySelector(".btn");
var cityNameDate = document. querySelector(".city-name-date");
var cityTemp = document. querySelector(".city-temp");
var cityWind = document. querySelector(".city-wind");
var cityHumidity = document. querySelector(".city-humidity");

//get day1 elements 
var day1Date = document. querySelector(".day1-date");
var day1Img = document. querySelector(".day1-weatherimg");
var day1CityTemp = document. querySelector(".day1-city-temp");
var day1CityWind = document. querySelector(".day1-city-wind");
var day1CityHumidity = document. querySelector(".day1-city-humidity");
//get day2 elements 
var day2Date = document. querySelector(".day2-date");
var day2Img = document. querySelector(".day2-weatherimg");
var day2CityTemp = document. querySelector(".day2-city-temp");
var day2CityWind = document. querySelector(".day2-city-wind");
var day2CityHumidity = document. querySelector(".day2-city-humidity");
//get day3 elements 
var day3Date = document. querySelector(".day3-date");
var day3Img = document. querySelector(".day3-weatherimg");
var day3CityTemp = document. querySelector(".day3-city-temp");
var day3CityWind = document. querySelector(".day3-city-wind");
var day3CityHumidity = document. querySelector(".day3-city-humidity");
//get day4 elements 
var day4Date = document. querySelector(".day4-date");
var day4Img = document. querySelector(".day4-weatherimg");
var day4CityTemp = document. querySelector(".day4-city-temp");
var day4CityWind = document. querySelector(".day4-city-wind");
var day4CityHumidity = document. querySelector(".day4-city-humidity");
//get day5 elements 
var day5Date = document. querySelector(".day5-date");
var day5Img = document. querySelector(".day5-weatherimg");
var day5CityTemp = document. querySelector(".day5-city-temp");
var day5CityWind = document. querySelector(".day5-city-wind");
var day5CityHumidity = document. querySelector(".day5-city-humidity");

console.log(searchButton);

searchButton.addEventListener('click',(e)=> {
    e.preventDefault();
    var city = searchCity.value;
    //alert(city);
    fetchCityWeather(city);
    
});

var weatherimg = document.querySelector("#weatherimg");
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
        if (response.status === 200)
            return response.json();
        else    
            console.log("City not found");
    })
    .then(function response(data){
        console.log(data);
        fetchCityWeatherIcon(data);
        setCityData(data);
    });
}

function setCityData(data){
    var date = data.list[0].dt;
    console.log("date is: " + date);
    var myDate = new Date(date);
    console.log("JS date: " + myDate.toLocaleDateString());
    var jsDate = dayjs(date);
    console.log(jsDate.format());

    // set main forecast
    cityNameDate.textContent = data.city.name;
    cityTemp.textContent = data.list[0].main.temp + " degrees F";
    cityWind.textContent = data.list[0].wind.speed + " mph";
    cityHumidity.textContent = data.list[0].main.humidity + "%";

    // set 5 day forecast
    cityNameDate.textContent = data.city.name;
    day1Date.textContent = data.list[7].dt_txt.split(" ")[0];
    day1CityTemp.textContent = data.list[7].main.temp + " degrees F";
    day1CityWind.textContent = data.list[7].wind.speed + " mph";
    day1CityHumidity.textContent = data.list[7].main.humidity + "%";

    day2Date.textContent = data.list[15].dt_txt.split(" ")[0];
    day2CityTemp.textContent = data.list[15].main.temp + " degrees F";
    day2CityWind.textContent = data.list[15].wind.speed + " mph";
    day2CityHumidity.textContent = data.list[15].main.humidity + "%";

    day3Date.textContent = data.list[23].dt_txt.split(" ")[0];
    day3CityTemp.textContent = data.list[23].main.temp + " degrees F";
    day3CityWind.textContent = data.list[23].wind.speed + " mph";
    day3CityHumidity.textContent = data.list[23].main.humidity + "%";

    day4Date.textContent = data.list[31].dt_txt.split(" ")[0];
    day4CityTemp.textContent = data.list[31].main.temp + " degrees F";
    day4CityWind.textContent = data.list[31].wind.speed + " mph";
    day4CityHumidity.textContent = data.list[31].main.humidity + "%";

    day5Date.textContent = data.list[39].dt_txt.split(" ")[0];
    day5CityTemp.textContent = data.list[39].main.temp + " degrees F";
    day5CityWind.textContent = data.list[39].wind.speed + " mph";
    day5CityHumidity.textContent = data.list[39].main.humidity + "%";
}

// fetch city weather icon
function fetchCityWeatherIcon(data){
var cityIconCode = data.list[0].weather[0].icon;
console.log("icon code: " + cityIconCode);
fetch(icon + cityIconCode + iconSuffix)
    .then(function(response){
        console.log(response.status);
        return response.blob();
    })
    .then(function response(data){
        var imageURL = URL.createObjectURL(data);
        console.log(imageURL);
        weatherimg.setAttribute("src",imageURL);
    });
}