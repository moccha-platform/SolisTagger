import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {
  
  @Output() closeSettings = new EventEmitter();
  @HostListener('document:keypress', ['$event'])
  handler(e: KeyboardEvent) {
    if (e.shiftKey) {
      switch(e.code) {
        case 'KeyP':
          console.log(this.settings.params);
          break;
      }
    } 
  }

  constructor(private translate: TranslateService,
              private settings: SettingsService,
              public files: FilesService) { }

  status = {
    current: <'search' | 'tagger' | 'ui' | 'cache' | 'language' | 'apis' | 'updates' | 'attributions'> 'updates'
  }

  close() {
    this.closeSettings.emit('');
  }

  ngOnInit(): void {
  }

}
