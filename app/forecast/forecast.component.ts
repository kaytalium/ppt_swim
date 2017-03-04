import { Component, OnInit } from '@angular/core';
import { MyServiceService} from '../service/my-service.service';
import { Observable } from 'rxjs/Observable';

/**
 * Import local services 
 */
import { LocalRequest } from '../service/LocalRequest';
import { Helper } from '../service/helper'
import { StaffCompliment } from '../service/app-interface';




/**
 * Set the Array with the weekend days
 */
const WEEKEND = ['Sat', 'Sun'];


/**
 * Creating Constant for the roles as they are in the db for search purpose
 */
const roles = {
    it: 'Information Technician',
    ms: 'Manufactor'
}


@Component({
  selector: 'forecast',
  templateUrl: './app/forecast/forecast.component.html',
  styleUrls: ['./app/forecast/forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  /**
   * creating the global var that will catch api information and render to the view
   */
  forecastFeed: any;

  /**
   * This var will store information coming from our local db
   */
  staffForecastEmailData:any;

  /**
   * Creating the global var to store user selected city option
   */
  city: string;

  /**
   * Creating an Object to store staff compliment count
   * Staff is divided into two group Manufactoring Workers and Information Technology Staff
   */
  staffCompliment:StaffCompliment;


  /**
   * Create var to access global helper class
   */
  helper: Helper = new Helper();


  /**
   * init my services and calling fn that will handle local db request
   * @param service 
   * @param localRequest 
   */
  constructor(private service: MyServiceService, private localRequest: LocalRequest) { }

  ngOnInit() {
    this.city = 'kingston'
   this.apiListCall('kingston');
  }


/**
 * fn control the city selection in the view that allow the user to choose between our two cities
 * 
 */
  cityOption(e){
   //from the event we access the target and then its value to get the user selection. 
   //the line below is setting the city name on the global var in order to display in the view 
    this.city = (e.target.value==='mobay'?'montego bay':e.target.value);

    //calling the fn that will update the view with the new weather information base selected city
    this.apiListCall(this.city);
  }


/**
 * This fn is the calling fn that handles the api call and setup the return apiData
 * call this function when you need to show the weather data. 
 * 
 * It accept only one input that is the city you want the weather for 
 * we are only concern with Jamaica's weather as such you only two option in this version ie [kingston,mobay] 
 */
  apiListCall(city:string, email: boolean = false){
     let listOfCond: Observable<any>;
     let apiData: any;
    
     //this function accept city as [kingston, mobay] at this point when the button is press this.city = 'montego bay' as such have to convert to mobay
     this.service.getCityWeather((city==='montego bay'?'mobay': city)).subscribe (_5DForecast=>{
       _5DForecast = _5DForecast.json(); 
       
       this.forecastFeed = _5DForecast.list;
       /**
        * This function is use to get the history of user init on forecast email
        * Also get the total and code for send email button
        */
        this.localRequest.getForcastEmailLog(city).subscribe(res=>{
            this.staffForecastEmailData = res.reverse();
        })
        
        /**
         * Getting the list of Staff in order to get the staff compliment for the selected city
         */
        this.localRequest.getStaffCompliment(this.city.toLowerCase())
            .subscribe((list)=>{
                let total: number = list.length;
                let iT_Total: number = 0;
                let ms_Total: number = 0;
                 
                 list.forEach(element => {
                    if(element.role === roles.it)
                      iT_Total++;
                 });
               
                list.forEach(element => {
                   if(element.role === roles.ms)
                      ms_Total++;
                });


          //setup the global var with the result in order to display in view
                this.staffCompliment = {total: total, it:iT_Total, ms:ms_Total};                
            })

        /**
         * handles the email button option if calling from button
         */    
        if(email){
          this.localRequest.setForcastEmailLog(city, _5DForecast.list);
        }
          
     })
  }


  sendBulkEmail(){
    this.apiListCall(this.city,true);
  }
  
}
