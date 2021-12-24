import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FilesService } from 'src/app/services/files.service';
import { TaggerService } from 'src/app/services/tagger.service';

@Component({
  selector: 'app-tagger-cont',
  templateUrl: './tagger-cont.component.html',
  styleUrls: ['./tagger-cont.component.css']
})
export class TaggerContComponent implements OnInit {

  constructor(public files: FilesService,
              public tagger: TaggerService) { }

  ngOnInit(): void { }

}
