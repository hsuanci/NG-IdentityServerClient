import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenModel } from '../model/codeModel';

@Injectable()
export class AuthService {
  tokenData: tokenModel;
  apiData: any;
  constructor(private http: HttpClient) {}
  getTokenData(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers,
    };
    return this.http.post<tokenModel>(
      this.getAuthServerToken(),
      this.getPararameter(code).toString(),
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
      this.getAuthServerToken(),
      this.getRefreshPararameter().toString(),
      options
    );
  }
  getAPIData() {
    let apiData: any;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    const options = {
      headers,
    };
    return this.http.get<any>(
      `https://localhost:44398/weatherforecast`,
      options
    );
  }
  getAuthServerConfig() {
    return `https://localhost:5001/connect/authorize?client_id=spa&scope=openid profile api1 offline_access&response_type=code&redirect_uri=http://localhost:4200/home`;
  }
  getAuthServerToken() {
    return `https://localhost:5001/connect/token`;
  }
  getPararameter(code: string) {
    const body = new URLSearchParams();
    body.set('client_id', 'spa');
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'http://localhost:4200/home');

    return body;
  }
  getRefreshPararameter() {
    const body = new URLSearchParams();
    body.set('client_id', 'spa');
    body.set('refresh_token', localStorage.getItem('refresh_token'));
    body.set('grant_type', 'refresh_token');
    body.set('redirect_uri', 'http://localhost:4200/home');

    return body;
  }
  setToken(token, refreshToken) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }
}
