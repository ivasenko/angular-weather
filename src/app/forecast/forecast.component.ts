import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Forecast} from './forecast';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentWeather} from '../current/current-weather';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  myWeather: CurrentWeather;

  constructor(private ws: WeatherService,  private route: ActivatedRoute) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }
  onSubmit() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.ws.fiveDayForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
      console.log(data);
      for (let i = 0; i < 10; i++) {
        const temporary = new Forecast(
        data.list[i].dt_txt,
        data.list[i].weather[0].icon,
        data.list[i].main.temp_max,
        data.list[i].main.temp_min)
        this.cityForecast.push(temporary);
      }
      console.log(this.cityForecast);
      return this.cityForecast;
    }
    )
  }
}
