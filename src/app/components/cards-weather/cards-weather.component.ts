import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from 'src/app/interfaces/clima.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css'],
})
export class CardsWeatherComponent implements OnInit {
  @Input() climaFiltradoRecibido: ClimaFiltrado;
  @Input() mostrarBoton: boolean = false;

  public showboton: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    // console.log(this.climaFiltradoRecibido);
  }

  AgregarCiudad() {
    const ArrayWeather = this.GetLocalStorage();

    if (this.ChecarNoRepetidos(ArrayWeather) == 0) {
      ArrayWeather.push(this.climaFiltradoRecibido.NombreCiudad);
      localStorage.setItem('Climas', JSON.stringify(ArrayWeather));
    } else {
      Swal.fire({
        title: `Ciudad repetida`,
        icon: "warning",
        text: "La ciudad elegida, ya fue anteriormente seleccionada"
      });
    }
  }

  // checara que no se repitan las ciudades
  private ChecarNoRepetidos(ArrayWeather: Array<string>): number {
    const ciudades: Array<any> = ArrayWeather.filter(
      (clima) => clima == this.climaFiltradoRecibido.NombreCiudad
    );

    console.log(ciudades.length);
    return ciudades.length;
  }

  public GetLocalStorage() {
    const ArrayWeather = JSON.parse(localStorage.getItem('Climas'));

    if (ArrayWeather == null) {
      return [];
    } else {
      return ArrayWeather;
    }
  }

  public irDetalles(ciudad) {
    if (!this.mostrarBoton) {
      const ciudad = this.climaFiltradoRecibido.NombreCiudad;
      this.router.navigate(['details', ciudad]);
    }
  }
}
