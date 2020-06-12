import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Clima } from '../../interfaces/clima.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=d53aec1e802c0738e55c8489fffcf1ff`;

  public currentWeather = {};

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    //   obtiene el nombre de la ciudad a la que se da click en la tarjeta
    //  console.log(this.activatedRoute.snapshot.paramMap.get('nombreCiudad'))
    const ciudad = this.activatedRoute.snapshot.paramMap.get('nombreCiudad');
    console.log(`${this.url}${ciudad}${this.apikey}`);
    this.currentWeather = this.http
      .get(`${this.url}${ciudad}${this.apikey}`)
      .pipe(
        map((clima: Clima) => {
          const objetoemp = {
            NombreCiudad: clima.name,
            ClimaActual: clima.weather[0].main,
            TemperaturaActual: clima.main.temp,
            TemperaturaMaxima: clima.main.temp_max,
            TemperaturaMinima: clima.main.temp_min,
            Imagen: clima.weather[0].icon,
            Viento: clima.wind.speed,
            Humedad: clima.main.humidity,
          };
          this.currentWeather = objetoemp;
        })
      )
      .subscribe((data) => console.log(data));
    console.log(this.currentWeather);
  }

  ngOnInit(): void {}
}
