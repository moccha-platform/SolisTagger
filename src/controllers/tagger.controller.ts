import { renderer } from '../../renderer/renderer';

import { read } from '../helpers/id3-promisify.helper'
import { selectorElement } from '../../ui/src/app/interfaces/selector.interface';
import { iTunes } from '../models/itunes.model';

/**
 * Controlador para el análisis de colección de elementos multimedia.
 * 
 */
export const analyzeCollection = (paths: Array<string>) => {

    const promiseMap = paths.map(el => read(el));
    Promise.allSettled(promiseMap)
    .then(a => {
        const resolved = a.filter(e => e.status === 'fulfilled' ? e.value : null);
        const rejected = a.filter(e => e.status === 'rejected');

        const analyzedCollection = { resolved, rejected };
    })


}


export const requestTag = (element: selectorElement) => {

  iTunes.search({entity: 'song', term: element.name })
  .then(a => {
      renderer.process.webContents.send('tagData', {tag: a});
  })
  // TODO: Manejar excepciones
  .catch(err => {
      console.log(err)
      renderer.process.webContents.send('tagData', {err: err});
  })

}