import { Component, NgZone, OnInit } from '@angular/core';
import { appVersions, updateInfo } from 'src/app/interfaces/appUpdate.interface';
import { IpcService } from 'src/app/services/ipc.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css', '../settings-sections.css']
})
export class UpdatesComponent implements OnInit {

  systemInfo: appVersions
  updates: updateInfo
  status = {
    updating: false,
    status: 0
  }

  constructor(private ipc: IpcService,
              private zone: NgZone,
              public settings: SettingsService) {

    this.ipc.once('updateChecks', (_, a) => {
      this.zone.run(() => {
        this.updates = a;
      })
    });
    this.ipc.once('appInfo', (_, a) => {
      this.zone.run(() => {
        this.systemInfo = a
      })
    });
    
    /* setTimeout(() => {
      this.updates = {
        current: '2.2.0',
        remote: '2.3.0',
        higher: false,
        pending: true
      }
    }, 2000); */
    this.ipc.send('appInfo');
    this.ipc.send('updateChecks');
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.systemInfo)
    }, 200);
  }

  update() {
    this.status.updating = true
    const int = setInterval(() => {
      if (this.status.status === 100) {
        clearInterval(int);
      } else if (this.status.status < 100) {
        this.status.status += 1;
      }
    }, 50)
  }

}
