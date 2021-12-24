import { Component } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  constructor(public files: FilesService) { console.log('Selector!') }

}
