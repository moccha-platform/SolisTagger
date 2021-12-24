import { Pipe, PipeTransform } from '@angular/core';
import { selectorElement } from '../interfaces/selector.interface';

@Pipe({
  name: 'validFile',
  pure: false
})

export class ValidFilePipe implements PipeTransform {

  transform(value: selectorElement[], filterValid: boolean = true) {

    // Si el flag de validFilter es true, devuelve los elementos válidos.
    if (filterValid) return value.filter(val => val.valid === true);

    // En caso contrario, devuelve los elementos inválidos.
    else return value.filter(val => val.valid === false);

  }

}
