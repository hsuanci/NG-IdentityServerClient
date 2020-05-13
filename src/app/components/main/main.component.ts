import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../authentication/OauthService';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherForecastModel } from 'src/app/model/WeatherForecastModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  apiData: WeatherForecastModel;
  constructor(private OauthService: OauthService) {}

  ngOnInit(): void {
    this.OauthService.getAPIData().subscribe((data) => {
      this.apiData = data;
    });
  }
}
