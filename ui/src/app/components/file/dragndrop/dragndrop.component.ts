import { Component, NgZone, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { invalidFile, validFile } from 'src/app/interfaces/selector.interface';
import { FilesService } from 'src/app/services/files.service';
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css'],
})
export class DragndropComponent {

  status = {
    dragIn:   false,
    waiting:  false
  }

  constructor(public files: FilesService,
              private ipc: IpcService,
              private zone: NgZone,
              private router: Router,
              private route: ActivatedRoute) {
    //if (files.files.length > 0) router.navigate(['/tagger'])
    //ipc.send('router', '/file');
    //this.router.navigate(['/tagger'])
    //this.router.navigate(['error'], { relativeTo: this.route, queryParams: { error: 'unknown', mime: 'x-octect-stream' } });
  }

  fileDrop(list: FileList) {

    console.log('Analizando')

    this.status.dragIn =  false;
    this.status.waiting = true;

    const files: string[] = [];
    Array.from(list).forEach(file => {
      files.push(file.path);
    })

    this.files.drop(files)
      .then(procedure => {
        console.log(procedure);
        
        if (procedure === 'normal') this.router.navigate(['selector'], { relativeTo: this.route })
        else this.router.navigate(['/tagger']);
        
      })
      .catch((err: 'UNKNOWN_TYPE' | 'Empty' | invalidFile) => {

        console.error(err)
        // Si no se corre este bloque en la zona Angular, la plantilla pierde la capacidad de detección de cambios.
        this.zone.run(() => {
          console.error(err);
          if (err === 'UNKNOWN_TYPE') {
            // ERROR
          } else if (typeof err === 'object') {
            this.router.navigate(['error'], { relativeTo: this.route });
          }
        })
      })
    
    //this.ipc.send('drop', files);
  }

}
