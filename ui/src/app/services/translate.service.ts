import { Injectable } from '@angular/core';
import { TranslateService as ngxTS } from "@ngx-translate/core";
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(public translate: ngxTS) {
    translate.addLangs(['en', 'es', 'it'])
    console.log(translate.getBrowserCultureLang())
    translate.setDefaultLang('en');
    //translate.use('en-US');
  }

  setLanguage(lang: string) {
    return this.translate.use(lang)
  }

  autoLang() {
    this.translate.use(this.translate.getBrowserLang()).subscribe(
      a => {},
      err => { this.translate.use('en') }
    )
  }
}
