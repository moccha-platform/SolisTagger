import { Component, HostListener, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { sidebarStatus } from 'src/app/interfaces/sidebar-status.interface';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-sidebar-tagger',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.shiftKey && event.metaKey) {
      if (event.key === 'u') this.status.section = 'untaggeds'
      else if (event.key === 't') this.status.section = 'taggeds'
      else if (event.key === 'm') this.status.section = 'matchs'
      else if (event.key === 'f') this.status.section = 'files'
    }
  }

  public status: sidebarStatus = {
    sidebar: 'visible',
    section: 'matchs',
    showSections: false
  }

  constructor(public files: FilesService,
              private router: Router) {
    
    if (files.files.length > 1) this.status.sidebar = 'visible'
    else if (files.files.length === 1) this.status.sidebar = 'hidden'
    else if (files.files.length < 1) this.router.navigate(['/file']);
  }

  ngOnInit(): void {
  }

}
