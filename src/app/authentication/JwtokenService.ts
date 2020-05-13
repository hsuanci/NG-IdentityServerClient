import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class JwtokenService {
  constructor() {}
  isAccessTokenExist() {
    if (localStorage.getItem('access_token'))
    {
      // return jwt_decode(localStorage.getItem('access_token')).exp -
      // Math.floor(new Date().getTime() / 1000) > 0;
      return true;
    }

    return false;
  }
}
