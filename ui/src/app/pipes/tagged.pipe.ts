import { Pipe, PipeTransform } from '@angular/core';
import { fileWithTag, selectorElement } from '../interfaces/selector.interface';

@Pipe({
  name: 'tagged'
})
export class TaggedPipe implements PipeTransform {

  transform(value: selectorElement[], filterTaggeds = true) {
    
    console.log(filterTaggeds)

    if (filterTaggeds) {
      console.log('Mostrando elementos con etiquetas');
      return value.filter(val => {
        if ( val.tag ) return true
        else return false;
      }) as fileWithTag[]
      
    } else {
      console.log('Mostrando elementos sin etiquetar');
      return value.filter(val => {
        if ( !val.tag ) return true
        else return false;
      })
      
    }

  }

}
