import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCambiarImagenClima]'
})
export class CambiarImagenClimaDirective {

  @Input() TipoClima:string = '';

  constructor() { }

}
