import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron'

@Injectable({providedIn: 'root'})
export class IpcService {

  private ipc: IpcRenderer;

  constructor() {
    try {
      this.ipc = window.require('electron').ipcRenderer;
    } catch (err) {
      throw err
    }
  }

  public on(event: string, listener: any) {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(event, listener);
  }
  
  public once(event: string, listener: any) {
    if (!this.ipc) {
      return;
    }
    this.ipc.once(event, listener);
  }
  
  public send(event: string, ...args: any[]) {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(event, ...args);  
  }

  public removeAllListener(event: string) {
    if (!this.ipc) {
      return;
    }
    this.ipc.removeAllListeners(event);  
  }
}
