import { Component, HostListener, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SettingsService } from './services/settings.service';
import { filter } from 'rxjs/operators';
import { IpcService } from './services/ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ui';
  status = false;

  @HostListener('document:keypress', ['$event'])
  handler(e: KeyboardEvent) {
    if (e.ctrlKey) {
      if (e.code === 'KeyS') { this.router.navigate(['/settings'])}
      else if (e.code === 'KeyF') this.router.navigate(['/file/selector'])
      else if (e.code === 'KeyT') this.router.navigate(['/tagger'])
    }
  }
  
  constructor(public settings: SettingsService,
              public router: Router,
              private ipc: IpcService,
              private zone: NgZone) {

    console.log('%c Solis Tagger ', 'background: #0080FF; color: white; padding: 5px 50px; font-weight: 600')
    console.log('%c Marcos Rodríguez (marcos_rg9) ', 'background: #6F1090; color: white;')
    console.log(' GitHub: https://github.com/solis-server/SolisTagger ')
    this.listenRouterEvents();
    this.loadSettings()
    .then(() => {
      this.status = true;
    })
  }
  
  private loadSettings() {
    return new Promise<void>((resolve, reject) => {
      this.ipc.on('settings', (_, a) => {
        this.zone.run(() => {
          this.settings.loadSettings(a.params);
          resolve();
        })
      })
      this.ipc.send('getSettings')
    })
  }
  
  private listenRouterEvents() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(a => this.ipc.send('router', a['url']))
  }
  
}
