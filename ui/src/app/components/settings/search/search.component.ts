import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../settings-sections.css']
})
export class SearchComponent implements OnDestroy {

  filterTester = {
    criteria: '',
    result: '',
    lastTestLevel: 0,
    dices: 0.1,
    fractionalNot: 0.1
  }

  constructor(public settings: SettingsService,
              private ipc: IpcService,
              private zone: NgZone,
              private translate: TranslateService) {
                
    ipc.on('stringSimilarity', (_, dice: number) => {
      this.filterTester.fractionalNot = dice;
      this.recalcDice();
    })
  }
  
  ngOnDestroy(): void {
    this.ipc.removeAllListeners('stringSimilarity');
  }
  
  testFilter() {
    const { criteria, result } = this.filterTester
    if (criteria.length < 1 || result.length < 1) return;
    this.ipc.send('stringChecker', criteria, result);
  }
  
  recalcDice() {
    this.zone.run(() => {
      const { fractionalNot } = this.filterTester
      this.filterTester.lastTestLevel = this.settings.params.search.filter;
      this.filterTester.dices = Math.floor(fractionalNot * 100);
      console.log(`Coeficiente de similaridad de Dice: ${fractionalNot}\nCriterio: ${this.filterTester.criteria}\nResultado: ${this.filterTester.result}`);
    })

  }

}
