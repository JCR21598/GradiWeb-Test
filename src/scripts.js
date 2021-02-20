$( document ).ready(function() {

    const api_key = "d29cf117a0fb58b32079849c93c64387";

    // Get Bogota's current weather and set to corresponding section
    bogotaWeatherData = bogotaWeather(api_key, "Bogota");

    // Get Bogota's 3 Day weather forecast
    bogotaForecastWeather = bogotaForecast(api_key, 4.71, -74.08, "current,minutely,hourly,alerts" );

    // Get the weather from place user input's


    // For Bogota's Today and 3 day forecast add it when page loads

});


function bogotaWeather(api_key, city_name){

    var api_call = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${api_key}`;
    
    // Make API call and fill in elements
    $.getJSON(api_call, function(data) {

        var bogotaIconId = data["weather"][0]["icon"];
        var bogotaTemp = data["main"]["temp"];
        
        var bogotaIcon = `https://openweathermap.org/img/w/${bogotaIconId}.png`

        var celsius = '&#8451'.sup();

        // The elements needed from HTML    
        $(".current-bogota-icon").attr("src", bogotaIcon);
        $(".current-bogota-temp").html(bogotaTemp + celsius);
      })
}

function bogotaForecast(api_key, lat, lon, exclude){

    var dayReference = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday", 
    };

    var celsius = '&#8451';

    var api_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${api_key}`;

     // Make API call and fill in elements
     $.getJSON(api_call, function(data) {

        console.log(JSON.stringify(data));

        for (count = 0; count < 3; count++) {

            // Extract and transform and values necessary
            var unix_timestamp = data["daily"][count]["dt"]
            var date = new Date(unix_timestamp * 1000);
            var day = date.getDay();
            var dayName = dayReference[day]

            var dayMinTemp = data["daily"][count]["temp"]["min"];
            var dayMaxTemp = data["daily"][count]["temp"]["max"];
            var tempsOfDay = `${Math.round(dayMinTemp)} / ${Math.round(dayMaxTemp)}`;

            var dayWeatherInfo = data["daily"][count]["weather"][0]["main"];

            var dayWeatherIconId = data["daily"][count]["weather"][0]["icon"];
            var dayWeatherIcon = `https://openweathermap.org/img/w/${dayWeatherIconId}.png`


            // Create elements for parent div
            var dayWeatherIconElem = document.createElement("img");
            var dayElem = document.createElement("div");
            var weatherInfoElem = document.createElement("div");
            var tempContainerElem = document.createElement("div");
            var tempElem = document.createElement("p");

            // Set class attr for styling
            dayWeatherIconElem.setAttribute("class", "bogota-weather-icon");
            dayElem.setAttribute("class", "bogota-day");
            weatherInfoElem.setAttribute("class", "bogota-weather-info");
            if(count == 0) {
                tempContainerElem.setAttribute("class", "bogota-temp bogota-forecast-day1");
            }
            else{
                tempContainerElem.setAttribute("class", "bogota-temp bogota-forecast-other");
            }
            tempElem.setAttribute("class", "forecast-text");
            

            // Add values to newly created elements
            var respDay = document.createTextNode(dayName);
            var respWeatherInfo = document.createTextNode(dayWeatherInfo);
            var respTemp = document.createTextNode(tempsOfDay);

            // Combine answer with element
            dayWeatherIconElem.setAttribute("src", dayWeatherIcon);
            dayElem.appendChild(respDay);
            weatherInfoElem.appendChild(respWeatherInfo);
            tempElem.appendChild(respTemp);
            tempContainerElem.appendChild(tempElem)

            // Append created elements to parent div 
            $(`.forecast-day${count + 1}`).append(dayWeatherIconElem, dayElem, weatherInfoElem, tempContainerElem); 
          }
        
        


 
      })
    
}

function addDataOnPageLoad(){

    

}