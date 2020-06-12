import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiWeatherService {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=d53aec1e802c0738e55c8489fffcf1ff`;

  constructor(private http: HttpClient) {}

  public ObtenerClima(NombreCiudad: string) {
    return this.http.get(`${this.url}${NombreCiudad}${this.apikey}`)
  }
}
