import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 * import local services
 */
import { WorkStatus } from '../service/app-interface';


/**
 * Declaring WEEKEND array 
 */
const WEEKEND = ['Sat', 'Sun'];


/**
 * Create const for work conditions 
 */
const msWorkStatus: WorkStatus = {
      rain:'Half Day 4hrs',
      sunny:'Normal 8hrs',
      noWork:'No Work'
};

const itWorkStatus: WorkStatus = {
  rain: 'In-house',
  sunny: 'Normal',
  noWork: '-'
}

export class Helper {

    constructor(){}  


     /**
       * This function accept the weather status, ie Rain, Clear, Clouds from this we can then determine the work 
       * condition for the day. 
       * 
       * Also the function accept day that represent the short version of the days of the week that is Mon, Tue, Wed, etc...
       * this will help to filter the weekend on the forecast as we dont care for the weekend in this version.
       * 
       * Once we look at the both input we will then return descriptive status to the view, see workStatus object
       */
    public workHour(status:string, day: string, group: string, isText: boolean = true){
      

      if(status!='Rain' && WEEKEND.indexOf(day) < 0 && group==='ms'){
        return msWorkStatus.sunny; 
      }else if(status!='Rain' && WEEKEND.indexOf(day) < 0 && group==='it') {
        return itWorkStatus.sunny
      }
      
      if(status==='Rain' && WEEKEND.indexOf(day) < 0 && group ==='ms'){
        return msWorkStatus.rain; 
      }else if(status==='Rain' && WEEKEND.indexOf(day) < 0 && group ==='it'){
        return itWorkStatus.rain;
      } 
      
      if(WEEKEND.indexOf(day) !=-1 && group==='ms'){
        return msWorkStatus.noWork; 
      }else if(WEEKEND.indexOf(day) !=-1 && group==='ms'){
        return itWorkStatus.noWork;
      }
      
    }    
}

/**
 * Spanish Town	17.991070	-76.957420	
 * Old Harbour	17.941441	-77.108978	
 * New Kingston	18.007469	-76.783188
 * Portmore	17.970240	-76.867218
 * Bog Walk	18.102051	-77.005409
 * Constant Spring	18.050779	-76.793716
 */