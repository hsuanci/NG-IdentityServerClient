import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenModel } from '../../model/codeModel';
@Injectable()
export class ConfigService {
  tokenData: tokenModel;
  apiData: any;
  constructor(private http: HttpClient) {}
  getCodeData() {
    // const codeObj = {} as codeModel;
    // codeObj.client_id = 'spa';
    // codeObj.code = localStorage.getItem('code');
    // codeObj.grant_type = 'authorization_code';
    // codeObj.redirect_uri = 'http://localhost:4200/home';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers,
    };
    return this.http.post<tokenModel>(
      this.getAuthServerToken(),
      this.getPararameter().toString(),
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
    return `https://localhost:5001/connect/authorize?client_id=spa&scope=openid profile api1&response_type=code&redirect_uri=http://localhost:4200/home`;
  }
  getAuthServerToken() {
    return `https://localhost:5001/connect/token`;
  }
  getPararameter() {
    const body = new URLSearchParams();
    body.set('client_id', 'spa');
    body.set('code', localStorage.getItem('code'));
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'http://localhost:4200/home');

    return body;
  }
}
