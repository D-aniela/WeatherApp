import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { Clima, ClimaFiltrado } from '../../interfaces/clima.interface';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiWeatherService } from '../../services/api-weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') InputCiudad: ElementRef;

  // ya no lo necesito porque ya esta integrado en el servicio
  // private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  // private apikey = `&appid=d53aec1e802c0738e55c8489fffcf1ff`;
  public climaFiltrado: ClimaFiltrado;
  public MostrarTarjeta: boolean = false;

  // private http: HttpClient, YA ESTA EN EL SERVICIO
  constructor(private router: Router, private AWService:ApiWeatherService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.ObtenerClimaActual();
  }

  IrHome() {
    this.router.navigate(['']);
  }

  private ObtenerClimaActual() {
    fromEvent(this.InputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.MostrarTarjeta = false)),
        pluck('target', 'value'),
        debounceTime(1500),
        switchMap((nombreCiudad:string) =>
        // Se intercambio por this.AWservice.ObtenerClima
        // this.http.get(`${this.url}${nombreCiudad}${this.apikey}`)
          this.AWService.ObtenerClima(nombreCiudad).pipe(
            map((clima: Clima) => {
              return {
                NombreCiudad: clima.name,
                ClimaActual: clima.weather[0].main,
                TemperaturaActual: clima.main.temp,
                TemperaturaMaxima: clima.main.temp_max,
                TemperaturaMinima: clima.main.temp_min,
                Imagen: clima.weather[0].icon,
              };
            })
          )
        )
      )
      .subscribe(
        (objetoFiltrado: ClimaFiltrado) => {
          this.climaFiltrado = objetoFiltrado;
          this.MostrarTarjeta = true;
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'El nombre de la ciudad no existe',
          });
          this.ObtenerClimaActual();
        }
      );
  }
}
