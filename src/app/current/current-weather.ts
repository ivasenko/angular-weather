export class CurrentWeather {
  constructor(public cityName: string,
              public temp: string,
              public icon: any,
              public weatherKind: string,
              public tempMax: string,
              public tempMin: string,
              public sunrise: number,
              public dtime: number){
  }
}
