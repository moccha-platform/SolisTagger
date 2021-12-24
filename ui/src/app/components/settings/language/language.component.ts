import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css', '../settings-sections.css']
})
export class LanguageComponent implements OnInit {

  constructor(public translate: TranslateService,
              public settings: SettingsService) { }

  ngOnInit(): void {
    console.log(this.settings.params)
  }

  setLang(lang: string | boolean) {
    if (typeof lang === 'string') {
      if (lang === this.settings.params.language.selected && !this.settings.params.language.auto) return;
      this.translate.setLanguage(lang).subscribe(
        a => {
          this.settings.params.language = {
            auto: false,
            selected: lang
          }
          this.settings.updateSettings();
        },
        err => {
          console.error(err);
        }
      )
    } else if (typeof lang === 'boolean') {
      //this.settings.params.language.auto = !this.settings.params.language.auto;
      if (this.settings.params.language.auto) {
        this.translate.autoLang();
      } else {
        this.translate.setLanguage(this.settings.params.language.selected);  
      }
      this.settings.updateSettings();
    }
    
  }

}
