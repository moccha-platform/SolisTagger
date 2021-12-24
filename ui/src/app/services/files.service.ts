import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpcRendererEvent } from 'electron/renderer';
import { validFile, invalidFile, selectorElement } from 'src/app/interfaces/selector.interface';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  public files: selectorElement[] = [];

  constructor(private ipc: IpcService,
              private router: Router) {
    const tester = true;
    /** Fuerza la adición elementos inválidos en la lista de archivos. */
    const invalid = false;

    if (tester) {
      this.files = [
        { name: 'Morirò da Re - Mäneskin', valid: true, path: '-', tag: '??' },
        { name: 'Levitating - Dua Lipa', valid: true, path: '-', tag: '??' },
        { name: 'The Weeknd - After Hours', valid: true, path: '-', tag: '??' },
        { name: 'Funny Thing About Love - BabyJake & Bipolar Sunshine', valid: true, path: '-' },
        { name: 'Más Alcohol - Natos y Waor, Recycled J', valid: true, path: '-', tag: '??' },
      ];
      if (invalid) {
        this.files.push({name: 'Lorem ipsum dolor sit amet', valid: false, MIME: 'application/octet-stream', path: '-'});
      }
    }
  }

  public drop(files: string[]) {

    console.log('Enviando archivos');
    console.log(files);

    return new Promise<'fast' | 'normal'>((resolve, reject) => {
      
      // Si la cantidad de elementos es inferior a 1, rechaza la promesa.
      if (files.length < 1) return reject('Empty');
      if (this.files[0])
      this.ipc.once('result', (_:IpcRendererEvent, r: validFile[] | invalidFile[]) => {
        
        console.log('Respuesta!');
        console.log(r);

        // Comprueba que los datos recibidos sea un objeto.
        if (typeof r !== 'object') return reject('UNKNOWN_TYPE');

        // Comprueba si la longitud de la matriz de elementos es inferior a 1.
        if (this.files.length < 1) {

          // Comprueba si la longitud de la matriz de elementos recibida es igual a 1.
          if (r.length === 1) {

            // Comprueba si el único elemento recibido es válido.
            if(this.isValid(r[0])) {
              // Procede con el etiquetado rápido.
              this.files.push(r[0]);
              console.log('Iniciando etiquetado rápido.');
              return resolve('fast');
            } else return reject(r[0]);
          }
        }

        // Resuelve la promesa delegando al procedimiento normal (multi-etiquetado).
        console.log('Iniciando etiquetado mediante procedimiento normal.');
        console.log(r);
        
        r.forEach( (a:selectorElement) => {
          if (!this.exists(a.path)) {
            this.files.push(a);
            console.log(this.files);
            
          }
        });
        return resolve('normal');
      });

      this.ipc.send('drop', files);
    })

  }

  public removeElement(path: string) {
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file.path !== path) continue;
      console.log(`Eliminando ${path}`);
      console.log(this.files);
      this.files.splice(i, 1);
      break;
    }
    if (this.files.length < 1) {
      this.router.navigate(['/file'])
    }
  }

  private isValid(file: validFile | invalidFile): boolean {

    const { path, valid } = file;

    if (typeof file === 'object') {
      if (typeof valid === 'undefined' || typeof path === 'undefined') return false;
      
      if (typeof valid === 'boolean') {
        if (valid === true) {
          if (typeof path === 'string' && path.length > 0) {
            return true;
          } else return false;
        } else return false;
      } else return false;
    } else return false;
  }

  private isOctet(mime: string): boolean {
    if (mime === 'application/octet-stream') return true
    return false;
  }

  private exists(path: string): boolean {
    if (this.files.filter(a => a.path === path).length > 0) { console.log (true); return true}
    else console.log(false); return false;
  }
}