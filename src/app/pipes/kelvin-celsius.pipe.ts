import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinCelsius'
})
export class KelvinCelsiusPipe implements PipeTransform {

  transform(value:number): string {
    // console.log(value);
    let celsius = Math.floor(value-273.15);
    
    return `${celsius}°`;
  }

}
