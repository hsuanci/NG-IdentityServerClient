import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { codeModel } from '../../model/codeModel';
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
  getCodeData() {
    // const codeObj = {} as codeModel;
    // codeObj.client_id = 'spa';
    // codeObj.code = localStorage.getItem('code');
    // codeObj.grant_type = 'authorization_code';
    // codeObj.redirect_uri = 'http://localhost:4200/home';
    console.log(this.getPararameter());
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers,
    };
    this.http
      .post<any>(
        this.getAuthServerToken(),
        this.getPararameter().toString(),
        options
      )

      .subscribe((data) => console.log(data));
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
