import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { MatchesModule} from './matches/matches.module';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    NgbModule.forRoot(),
    MatchesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
