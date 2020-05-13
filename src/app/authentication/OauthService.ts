import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenModel } from '../model/codeModel';
import { WeatherForecastModel } from '../model/WeatherForecastModel';
import configure from '../../../configure';

@Injectable()
export class OauthService {
  tokenData: tokenModel;
  apiData: WeatherForecastModel;
  constructor(private http: HttpClient) {}
  getTokenData(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers,
    };
    return this.http.post<tokenModel>(
      configure.authServerTokenEndpoint,
      this.getokenPararameter(code).toString(),
      options
    );
  }
  getReFreshTokenData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers,
    };
    return this.http.post<tokenModel>(
      configure.authServerTokenEndpoint,
      this.getRefreshPararameter().toString(),
      options
    );
  }
  getAPIData() {
    return this.http.get<WeatherForecastModel>(
      `${configure.apiServer}weatherforecast`
    );
  }
  getokenPararameter(code: string) {
    const body = new URLSearchParams();
    body.set('client_id', 'spa');
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'http://localhost:4200/login');

    return body;
  }
  getRefreshPararameter() {
    const body = new URLSearchParams();
    body.set('client_id', 'spa');
    body.set('refresh_token', localStorage.getItem('refresh_token'));
    body.set('grant_type', 'refresh_token');
    body.set('redirect_uri', 'http://localhost:4200/login');

    return body;
  }
  setToken(token, refreshToken) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }
}
