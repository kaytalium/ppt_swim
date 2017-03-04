import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


//Set all constant variable of the api calling url structure 

/**
 * This app gets it weather data from openweatherpap.com and this is the api key 
 * without this key you cannot get data
 */
const apiKey = '<your open weather map api key goes here>';

/**
 * openweathermap url for api calls
 */
const apiUrl ='http://api.openweathermap.org/data/2.5/forecast/daily?';

/**
 * Creating the city location Object with latitude and longtitude coordinates
 */
const city ={
                kingston:{lat:17.997021,lon:-76.793579},
                mobay:{ lat:18.471161,lon:-77.918831}
            }



@Injectable()
export class MyServiceService {    

    constructor(private http: Http) {}
    
    getCityWeather(userCity: string) : Observable<any>{
        
        let apiCall: string;
        let appid = '&cnt=5&APPID=';
        apiCall = apiUrl+'lat='+city[userCity].lat+'&lon='+city[userCity].lon+appid+apiKey;
        return  this.http.get(apiCall); 
    }

}