<?php

/**
  * This file would be placed in the cron jobs and schedule for execution at the desired interval. 
  * Also this is a demo file and will no be running as such, i'm calling the data from a JSON file locally stored.
  * this file represent staff data.
  * 
  * The weather api will also be called here.
  *
  */
$kgn = array("lat"=>17.997021,"lon"=>-76.793579);
$mob = array("lat"=>18.471161,"lon"=>-77.918831);

$city = array("kingston"=>$kgn, "montego bay"=>$mob);

$APPID = '< knymbus server app key goes here >';

$owapiKey = '< open weather map api key >';


include "class/ClassAutoLoader.php";


foreach ($city as $key => $value) {
	# code...
		
	//get the forcast data
	$forecast = json_decode(file_get_contents('http://api.openweathermap.org/data/2.5/forecast/daily?lat='.$value['lat'].'&lon='.$value['lon'].'&cnt=5&APPID='.$owapiKey),true);

	
	//list of 5-day weather forecast for selected city
	$forecastData = $forecast['list']; 

	//we now need to get the staff list
	$staff = json_decode(file_get_contents('< local json file url'), true); 

	$request = array("city"=>$key,"staff"=>$staff, "forecastData"=>$forecastData);

	sendMail($request);
}


