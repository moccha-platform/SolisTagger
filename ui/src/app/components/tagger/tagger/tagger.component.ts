import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';
import { TaggerService } from 'src/app/services/tagger.service';
import { track } from '../../../../../../src/interfaces/itunes.interface';

@Component({
  selector: 'app-tagger',
  templateUrl: './tagger.component.html',
  styleUrls: ['./tagger.component.css']
})
export class TaggerComponent implements OnInit {

  currentTag: {
    provider: 'iTunes' | 'Deezer',
    waiting?: boolean,
    tag?: track
  }

  constructor(public tagger: TaggerService,
              public files: FilesService) {

    this.currentTag = tagger.currentTag
  }

  ngOnInit(): void {
  }

}
