import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {CurrentWeather} from "./current-weather";
import 'rxjs/Rx';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  // myWeather: CurrentWeather;
  public weatherData: any;

  hourForecastForm: FormGroup;
  hourCityForecast: CurrentWeather[] = [];

  constructor(private ws: WeatherService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: { myWeather: CurrentWeather }) => {
    //     this.myWeather = data.myWeather;
    //   }
    // )
    // this.route.data.subscribe(
    //   (data: { hourCityForecast: CurrentWeather[] }) => {
    //     this.hourCityForecast = data.hourCityForecast;
    //   }
    // )


    this.hourForecastForm = new FormGroup({
      cityHour: new FormControl('')
    });
  }
  onSubmit() {
    this.hourCityForecast.splice(0, this.hourCityForecast.length);
    this.ws.anotherCityWeather(this.hourForecastForm.value.cityHour).subscribe(
      (data) => {
      console.log(data);
      for (let i = 0; i < 12; i++) {
        const tempo = new CurrentWeather(
       data.name,
          data.main.temp,
          data.weather[0].icon,
          data.weather[0].description,
          data.main.temp_max,
          data.main.temp_min,
          data.sys.sunrise,
          data.dt)
          this.hourCityForecast.push(tempo);

      }
      console.log(this.hourCityForecast);
      return this.hourCityForecast;
    }
    )
  }


  parseRecivedData(weatherData) {
    const weatherDataArr = [];

  for (const list of this.weatherData){
    weatherData.forEach(listH => {
      listH.dt_txt = list.dt_txt;
      weatherDataArr.push(listH);
    });
  }
    
  }
  //   onSubmit(weatherForm: NgForm) {
  //   this.ws.anotherCityWeather(weatherForm.value.city).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.myWeather = new CurrentWeather(
  //         data.name,
  //         data.main.temp,
  //         data.weather[0].icon,
  //         data.weather[0].description,
  //         data.main.temp_max,
  //         data.main.temp_min,
  //         data.sys.sunrise,
  //         data.dt)
  //     }
  //   )
  // }
  public goToTenDaysWeather(){
    this.router.navigate(['forecast']);
  }
  // public goToCurrentlocation(){
  //   this.route.data.subscribe(
  //     (data: { myWeather: CurrentWeather }) => {
  //       this.myWeather = data.myWeather;
  //     }
  //   )
  // }
}
