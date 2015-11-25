$(document).ready(function($){


	var html ="";
	var apikey ="0b66f0f8e1b5e15a5b59581c421348aa";

	$('#city-search-form').submit(function(){
		event.preventDefault();
		
		$('#forecast-title').html("PORRRICE")

		var cityName = $('#cityInput').val();
		var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID="+apikey;
		var weatherForecast = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +cityName + ",us&units=imperial&APPID="+apikey;
		
		//make the cityinput into the html on html page
	$.getJSON(weatherForecast, function(weatherForecastData){
		console.log(weatherForecastData);
		var forecastIcon='';
		var forecastMorn ='';
		var forecastNight ='';
		var forecastHumidity ='';
		var forecastDescription ='';
		for ( var i=1; i<6; i++){
			forecastMorn += '<div>'+weatherForecastData.list[i].temp.morn + '</div>'
			forecastNight += '<div>'+weatherForecastData.list[i].temp.night + '</div>'
			forecastIcon += '<img class="forecast-icon" src="http://openweathermap.org/img/w/' + weatherForecastData.list[i].weather[0].icon + '.png">';
			forecastHumidity += '<div>' + weatherForecastData.list[i].humidity + '%</div>';
			forecastDescription += '<div>' + weatherForecastData.list[i].weather[0].description + '</div>';
 
			console.log(weatherForecastData.list[i]);
		}
		$('#put-forecast-morn-here').html(forecastMorn);
		$('#put-forecast-night-here').html(forecastNight);
		$('#put-forecast-icon-here').html(forecastIcon);
		$('#put-forecast-humidity-here').html(forecastHumidity);
		$('#put-forecast-description-here').html(forecastDescription);
	});
	
	$.getJSON(weatherUrl, function(weatherData){
		console.log(weatherData);

		currTemp = weatherData.main.temp;
		currTempIcon = weatherData.weather[0].icon;
		currTempDescription = weatherData.weather[0].description;
		var putCityHere = weatherData.name;
		console.log(putCityHere);
		$('#put-city-name').html(weatherData.name);
		$('#put-description-here').html("Condition: " + currTempDescription);
		$('#put-humidity-here').html("Humidity: " + weatherData.main.humidity + "%");
		$('#put-icon-here').attr('src', "http://openweathermap.org/img/w/" + currTempIcon+ ".png");

		console.log(currTemp);

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');

	context.clearRect(0, 0, canvas.height(), canvas.width());
	// context.beginPath();
	// context.moveTo(0,0);
	// context.lineTo(100,100);
	// context.moveTo(20,100);
	// context.lineTo(20,50);
	// context.lineWidth = 10;
	// context.stroke();

	var lineWidth = 5
	var outterRadius = 70;
	var innerRadius = outterRadius - lineWidth;
	var currPerc = 0;
	var counterClockwise = false;
	var circ = Math.PI * 2;
	var quart = Math.PI / 2;
	var shadeColor; //hoisted so no need for it

	if(currTemp < 32){
		shadeColor = '#3399ff';
	}else if((currTemp >= 32) && (currTemp < 59)){
		shadeColor = "#66ccff";
	}else if((currTemp >= 59) && (currTemp < 75)){
		shadeColor = "#ff6633";
	}else if((currTemp >= 75) && (currTemp < 90)){
		shadeColor = "#ff0000";
	}else{
		shadeColor = "#e3170d";
	}


function animate(current){

	context.fillStyle = "#ccc";
	context.beginPath();
	context.arc(155, 75,innerRadius,0,2*Math.PI,true);
	context.closePath();
	context.fill();

	context.lineWidth = 5;
	context.strokeStyle = shadeColor
	context.beginPath();
	context.arc(155, 75, outterRadius, -(quart), ((circ) * current) - quart, false);
	context.stroke();
	context.font = "35px Arial";
	context.fillStyle= "White";
	context.textBaseLine = "hanging";
	context.fillText(currTemp, 185-outterRadius, 115-outterRadius/2,80);
	currPerc++;
	if(currPerc < currTemp){
		requestAnimationFrame(function(){
			animate(currPerc / 100);
		});
	}
}

animate();
context.closePath();

	});

});
});