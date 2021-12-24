import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  type: string;
  mime: string;

  constructor(public settings: SettingsService,
              private route: ActivatedRoute) {
    
    route.queryParams.subscribe((a: any) => {
      this.type = a.error;
      if (a.mime) this.mime = a.mime;
      console.log(a)
    })
  }

  ngOnInit(): void {
  }

}
