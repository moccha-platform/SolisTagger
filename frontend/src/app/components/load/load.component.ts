import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnDestroy, OnInit {

  error:boolean = false;
  currentFile:Object;

  constructor( public ipc:IpcService,
               private cdRef: ChangeDetectorRef,
               private router: Router ) {}

  // Drag&drop para el objeto arrastrado a la aplicación.
  drop(a:object) {

    const { path, name, type } = a[0];
    
    if (type !== 'audio/mpeg') {
      this.currentFile = null;
      this.error = true;
      this.cdRef.detectChanges()
      return;
    }
    
    const data = { path, name, type };
    this.ipc.send('elementDrop', data);

    this.ipc.on('fileStatus', (event, arg) => {
      if (arg == false) {
        this.error = true;
        this.currentFile = null;
      } else {
        this.error = false;
        this.currentFile = arg;
      }
      this.cdRef.detectChanges();
    })
  }

  cancel() {
    this.currentFile = null;
    this.error = false;
    this.cdRef.detectChanges();
  }

  confirm() {
    this.ipc.send('findData');
    this.router.navigate(['matchs']);
  }
 
  ngOnInit() {
    this.ipc.on('done', (event, a) => {
      if (a === false) {
        this.error = true;
        this.currentFile = null;
        this.cdRef.detectChanges();
        return;
      }
    })
  }

  ngOnDestroy() {
    //this.ipc.removeAllListeners;
    this.currentFile = null;
    this.cdRef.detectChanges();
  }

}
