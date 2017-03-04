import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


/**
 * Import local Services
 */
import { Helper } from './helper';
import { EmailApi } from './emailapi';

/**
 * Import local Interface
 */
import { } from './app-interface';

/**
 * Email request APP key
 */
const emailAppId = '`< Knymbus Application access key goes here >`';

@Injectable()
export class LocalRequest {
    
    private helper: Helper = new Helper();

    private emailApi: EmailApi = new EmailApi();

     constructor(private af: AngularFire, private http: Http) {}
    
    /**
     * @param city //accept the name of the city you want to search on
     * and return the log that show the last 3 occurance when the app send forecast email base on the selected city
     */
    getForcastEmailLog(city:string): Observable<any>{
        
        //console.log("selected city: ",city)
        let list: FirebaseListObservable<any> = this.af.database.list('swim/log',{
            query:{
                limitToLast:3,
                orderByChild: "city",
                equalTo: city
            }
        });
       
      return list;
    }

    /**
     * This fn will send email to all staff base on city and forecast data
     * @param city 
     * @param forecastData
     */
    setForcastEmailLog(city: string, forecastData:any){
        //console.log('city: ',city, 'forecastData: ', forecastData);
        
        city = city.toLowerCase();

        
        // create the referrence path to the databse where the log will be saved. 
        let log: FirebaseListObservable<any> = this.af.database.list('swim/log');

        /**
         * We need to now get the list of all the staff from the database that live in the selected city
         * lets create a referrence and perform a query for the data. 
         */
        let location: FirebaseListObservable<any> = this.af.database.list('swim/staff',{
                query:{
                    orderByChild: "city",
                    equalTo:city
                }
        });
        
       
        /**
         * now that we have the staff data we can now move to sending email to all staff.
         */
        location.subscribe((listOfStaff: any)=>{
            
            /**
             * The request var is the data that is needed by the backend to send email
             */
             let request = {city:city, staff:listOfStaff, forecastData: forecastData, APPID: emailAppId};

            /**
             * Post data to backend and log result.
             */
             this.http.post('`<backend url goes here`', request).subscribe((res)=>{
                    //Convert result to json
                    let result: any = res.json();
                    
                    //Push the result of the call to our firebase db 
                    //User will see this log in view as the top most item
                    log.push(result)
             })
        })
    }



    /**
     * Return the total staff and division of in selected city ie 
     * @output: {total: 20, it: 5, ms: 15}
     * 
     * We will create a referrence to the staff listings and return only the selected city 
     * then we will map on the result changing its structor to reflect our desired @output 
     * @param city 
     */
    getStaffCompliment(city:string){
        let staff: FirebaseListObservable<any> = this.af.database.list('swim/staff',{
                query:{
                    orderByChild:"city",
                    equalTo:city
                }
        });
       return staff;
    }
}