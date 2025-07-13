import { config } from './config.js'

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(config.API_URL + city + `&appid=${config.API_KEY}`)
    let data = await response.json()

    if (response.status === 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    } else if(response.status === 200) {

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds": weatherIcon.src = "images/clouds.png"; break;
            case "Clear": weatherIcon.src = "images/clear.png"; break;
            case "Rain": weatherIcon.src = "images/rain.png"; break;
            case "Drizzle": weatherIcon.src = "images/drizzle.png"; break;
            case "Mist": weatherIcon.src = "images/mist.png"; break;
            case "Snow": weatherIcon.src = "images/snow.png"; break;
            default: weatherIcon.src = "images/clouds.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        searchBox.value = ""
        
    } else {
        alert(data.message)
    }

}

searchBtn.addEventListener("click", () => {
    if (!searchBox.value) {
        alert("Please enter city name")
    } else {
        checkWeather(searchBox.value)
    }
})