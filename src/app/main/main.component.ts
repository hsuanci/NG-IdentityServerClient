import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('code')) {
      localStorage.setItem('code', this.route.snapshot.queryParamMap.get('code'));
      this.configService.getCodeData();
    }

    if (!localStorage.getItem('code')) {
      console.log(`it's seems has not token in here !`);
      window.location.href = this.configService.getAuthServerConfig();
    }
  }
}
