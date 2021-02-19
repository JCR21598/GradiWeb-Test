$( document ).ready(function() {

    const api_key = "d29cf117a0fb58b32079849c93c64387";

    // Get Bogota's current weather and set to corresponding section
    bogotaWeatherData = bogotaWeather(api_key, "Bogota");

    // Get Bogota's 3 Day weather forecast
    bogotaForecastWeather = bogotaForecast(api_key);

    // Get the weather from place user input's


    // For Bogota's Today and 3 day forecast add it when page loads

});


function bogotaWeather(api_key, city_name){

    var api_call = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${api_key}`;
    
    // Make API call and fill in elements
    $.getJSON(api_call, function(data) {

        bogotaIconId = data["weather"][0]["icon"];
        bogotaTemp = data["main"]["temp"];
        
        bogotaIcon = `http://openweathermap.org/img/w/${bogotaIconId}.png`
        
        console.log(JSON.stringify(data))

        console.log(`Bogota - Weather Icon ID: ${bogotaIcon}`)
        console.log(`Bogota - Weather Temp: ${bogotaTemp}`)

        var celsius = '&#8451'.sup();

        // The elements needed from HTML    
        $(".current-bogota-icon").attr("src", bogotaIcon);
        $(".current-bogota-temp").html(bogotaTemp + celsius);
      })
}

function bogotaForecast(){



}

function addDataOnPageLoad(){

    

}