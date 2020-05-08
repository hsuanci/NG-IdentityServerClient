import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { WeatherForecastModel } from 'src/app/model/WeatherForecastModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {
  apiData: WeatherForecastModel;
  constructor(
    private AuthService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Auth Code
    if (this.route.snapshot.queryParamMap.get('code')) {
      this.AuthService.getTokenData(
        this.route.snapshot.queryParamMap.get('code')
      ).subscribe((data) => {
        this.AuthService.setToken(data.access_token, data.refresh_token);
        console.log('Successful get the token from auth server by auth code !');
        console.log('Waiting for reload !');
        setTimeout(() => {
          window.location.href = './home';
        }, 5000);
      });
      // Chack with access token
    } else if (!localStorage.getItem('access_token')) {
      console.log(`it's seems has no token in here !`);
      console.log('Waiting for redirect !');
      setTimeout(() => {
        window.location.href = this.AuthService.getAuthServerConfig();
      }, 5000);
      // Get API
    } else {
      this.AuthService.getAPIData().subscribe(
        data => {
          this.apiData = data;
          console.log(this.apiData)
        },
        (error) => {
          if (error.status === 401) {
            console.log(error.message);
            console.log('Waiting for refresh token.');
            setTimeout(() => {
              this.AuthService.getReFreshTokenData().subscribe(
                (data) => {
                  this.AuthService.setToken(
                    data.access_token,
                    data.refresh_token
                  );
                  console.log('Got refresh token from auth server.');
                  console.log('Wating for reload.');
                  setTimeout(() => {
                    window.location.href = './home';
                  }, 5000);
                },
                (error) => {
                  if (error.status === 400) {
                    console.log('refresh token has been expired.');
                    console.log('waiting for redirect !');
                    setTimeout(() => {
                      window.location.href = this.AuthService.getAuthServerConfig();
                    }, 5000);
                  }
                }
              );
            }, 5000);
          }
        }
      );
    }
  }
}
