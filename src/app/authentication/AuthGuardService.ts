import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtokenService } from './JwtokenService';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private JwtokenService: JwtokenService, private router: Router) {}
  canActivate(): boolean {
    console.log('Route Guards Start.');
    if (this.JwtokenService.isAccessTokenExist()) {
      console.log('Token exising on Client !');

      return true;
    } else {
      console.log('Cannot find token on Clinet');
      console.log('Wating for redirect !');
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 5000);

      return false;
    }
  }
}
