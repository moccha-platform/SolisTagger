import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FilesService } from '../services/files.service';

@Injectable({
  providedIn: 'root'
})
export class SelectorGuard implements CanActivate {
  
  constructor(private file: FilesService,
              private router: Router) { }

  canActivate(): boolean {
    if (this.file.files.length < 1) this.router.navigate(['/file']);
    return true
  }
  
}
