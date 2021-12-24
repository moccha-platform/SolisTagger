import { Injectable, NgZone } from '@angular/core';

import { Buffer } from 'buffer';

import { selectorElement } from '../interfaces/selector.interface';
import { FilesService } from './files.service';
import { IpcService } from './ipc.service';

import { ItunesResult, track } from '../../../../src/interfaces/itunes.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaggerService {

  currentTag: {
    provider: 'iTunes' | 'Deezer',
    waiting: boolean,
    tag?: track
  } = {
    provider: 'iTunes' ,
    waiting: true
  }

  allTags: ItunesResult;
  cover: string

  constructor(private ipc: IpcService,
              private files: FilesService,
              private zone: NgZone,
              private http: HttpClient) {
    
    /** Comienza a cargar el primer archivo... */

    console.log('Cargando servicio de etiquetador!')
    this.currentTag.waiting = true;
    this.requestTag(files.files[0])
      .then(data => {
        const tags = data.results as track[];
        this.currentTag.tag = tags[0];
        this.allTags = data;
        console.log('Descargando imagen')
        console.log(data)
        this.http.get(tags[0].artworkUrl3000, { responseType: 'arraybuffer'})
        .pipe(map(data => {
            const raw = Buffer.from(data).toString('base64')
            this.cover = raw
            this.currentTag.waiting = false;
          })).subscribe()
      })
  }

  head(url: string) {
    this.http.head(url)
    .subscribe()
  }

  requestTag(element: selectorElement): Promise<ItunesResult> {
    console.log('Solicitando etiqueta',element)
    return new Promise((resolve, reject) => {
      this.zone.run(() => {

        if (!element.path) reject('EMPTY_PATH'); 
        
        // TODO: Propiedad tag. Renombrar por data u otro nombre más apropiado.
        this.ipc.once('tagData', (listener, data: { tag?: ItunesResult, error: any}) => {
          console.log('Recibiendo datos del proceso principal');
          if (data.tag) resolve(data.tag)
          else if (data.error) reject(data.error);
        })
        console.log('Enviando petición',element)
        this.ipc.send('requestTag', element);

      })
    })
  }

  openInBrowser(url: string) {
    console.log(this.currentTag.tag);
    this.ipc.send('openInBrowser', url);
  };
}
