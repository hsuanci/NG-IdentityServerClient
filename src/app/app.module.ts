import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { JwtokenService } from './authentication/JwtokenService';
import { OauthService } from './authentication/OauthService';
import { AuthGuardService } from './authentication/AuthGuardService';

import { RouterModule, Routes } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownModule } from 'ngx-countdown';

import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component'
import { RequestTimeLogHttpInterceptor, TokenAuthHttpInterceptor } from './authentication/HttpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    CountdownModule,
    NgbModule,
  ],
  providers: [
    OauthService,
    AuthGuardService,
    JwtokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTimeLogHttpInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
