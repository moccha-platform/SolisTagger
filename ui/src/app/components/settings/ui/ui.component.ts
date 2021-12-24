import { Component, OnInit } from '@angular/core';
import { settingsParams } from 'src/app/interfaces/settingsParams.interface';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css', '../settings-sections.css'],
})
export class UiComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  setTheme(theme: settingsParams['appearance']['mode']) {
    if (theme === this.settings.params.appearance.mode) return;
    this.settings.theme = theme;
    this.settings.updateSettings();
  }

  ngOnInit(): void {
    
  }

}
