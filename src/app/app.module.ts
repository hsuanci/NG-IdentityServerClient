import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/AuthService';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../router/index';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownModule } from 'ngx-countdown';

import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    CountdownModule,
  ],
  providers: [
    AuthService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
