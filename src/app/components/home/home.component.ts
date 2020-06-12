import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';
import { ApiWeatherService } from 'src/app/services/api-weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  // private apikey = `&appid=d53aec1e802c0738e55c8489fffcf1ff`;

  public ArrayClimaFiltrado: Array<ClimaFiltrado> = [];
  public loading: boolean = true;

  constructor(private router: Router, private AWService:ApiWeatherService) {
    this.getLocalStorage();
  }

  ngOnInit(): void {}

  IrAgregar() {
    this.router.navigate(['/add']);
  }

  getLocalStorage() {
    const climas = JSON.parse(localStorage.getItem('Climas'));
    if (climas !== null) {
      this.getWeather(climas);
    }
  }

  getWeather(climas: Array<string>) {
    from(climas)
      .pipe(
        concatMap((nombreClima:string) =>
          this.AWService.ObtenerClima(nombreClima).pipe(
            map((Clima: Clima) => {
              console.log(Clima)
              const climaFiltrado: ClimaFiltrado = {
                NombreCiudad: Clima.name,
                ClimaActual: Clima.weather[0].main,
                TemperaturaActual: Clima.main.temp,
                TemperaturaMinima: Clima.main.temp_min,
                TemperaturaMaxima: Clima.main.temp_max,
                Imagen: Clima.weather[0].icon,
              };
              return climaFiltrado;
            })
          )
        )
      )
      .subscribe((climaFiltrado: ClimaFiltrado) => {
        this.ArrayClimaFiltrado.push(climaFiltrado);
        if (this.ArrayClimaFiltrado.length == climas.length) {
          this.loading = false;
          // console.log(this.ArrayClimaFiltrado);
        }
      });
  }
}
