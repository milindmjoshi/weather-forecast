console.log("hello, main");
var searchButton = document.querySelector(".btn");
console.log(searchButton);

searchButton.addEventListener('click',()=> alert("hi"));

var weatherimg = document.querySelector("#weatherimg");
//var api = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`"

var tampa = "https://api.openweathermap.org/data/2.5/forecast?lat=27.964157&lon=-82.452606&appid=c1e8ac23970e9332cf4800d78f376d1a";

//by city
var bycity = "https://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=c1e8ac23970e9332cf4800d78f376d1a";

// var icon = "https://openweathermap.org/img/wn/10d@2x.png";
var icon = "https://openweathermap.org/img/wn/10d@2x.png";

// fetch weather
fetch(bycity)
    .then(function(response){
        console.log(response.status);
        return response.json();
    })
    .then(function response(data){
        console.log(data);
    });

// fetch icons
fetch(icon)
    .then(function(response){
        console.log(response.status);
        return response.blob();
    })
    .then(function response(data){
        var imageURL = URL.createObjectURL(data);
        console.log(imageURL);
        weatherimg.setAttribute("src",imageURL);
    });