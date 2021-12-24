import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  public ipc!: IpcRenderer;

  constructor(private zone: NgZone) {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (err) {
        throw err;
      }
    }
  }

  public on(channel:string, listener: any):any {
    if (!this.ipc) return;
    this.ipc.on(channel, listener);
  }
  
  public send(channel:string, ...args:any[]):any {
    if (!this.ipc) return;
    this.ipc.send(channel, ...args);
  }
  
  public removeAllListeners(channel:string):any {
    if (!this.ipc) return;
    this.ipc.removeAllListeners(channel);
  }

  public once(channel:string, listener: any):any {
    if (!this.ipc) return;
    this.zone.run(() => {
      this.ipc.once(channel, listener);
    })
  }
  
  /* public invoke(channel: string, ...args: any[]): Promise<any> {
    if (!this.ipc) return;
    return this.ipc.invoke(channel, ...args);
  } */
}
