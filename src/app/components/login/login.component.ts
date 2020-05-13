import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../authentication/OauthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private OauthService: OauthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('code')) {
      this.OauthService.getTokenData(
        this.route.snapshot.queryParamMap.get('code')
      ).subscribe((data) => {
        this.OauthService.setToken(data.access_token, data.refresh_token);
        console.log('Successful get the token from auth server by auth code !');
        console.log('Waiting for reload !');
        setTimeout(() => {
          window.location.href = './home';
        }, 5000);
      });
    } else {
      window.location.href = `https://localhost:5001/connect/authorize?client_id=spa&scope=openid profile api1 offline_access&response_type=code&redirect_uri=http://localhost:4200/login`;
    }
  }
}
