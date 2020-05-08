import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  tokenlifeTime: number;
  constructor() {}

  ngOnInit(): void {
    this.showsTokenLifeTime();
  }
  showsTokenLifeTime(): void {
    if (localStorage.getItem('access_token')) {
      const alifeTime =
        jwt_decode(localStorage.getItem('access_token')).exp -
        Math.floor(new Date().getTime() / 1000);
      if (alifeTime > 0) {
        this.tokenlifeTime = alifeTime;
      } else {
        this.tokenlifeTime = 0;
      }
    } else {
      this.tokenlifeTime = 0;
    }
  }
}
