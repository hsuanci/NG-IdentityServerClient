import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { ConfigService } from './main/service/service';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../router/index';

import { tokenModel } from '../app/model/codeModel';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    //tokenModel
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
