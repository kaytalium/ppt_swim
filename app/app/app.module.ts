import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ForecastComponent } from '../forecast/forecast.component';

import { MyServiceService } from '../service/my-service.service';

import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../service/firebase.config';

import 'hammerjs';

/**
 * import services 
 */

import { LocalRequest } from '../service/LocalRequest';

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent
  ],
  entryComponents:[
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers:[
    MyServiceService,
    LocalRequest
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }