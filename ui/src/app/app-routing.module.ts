import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragndropComponent } from './components/file/dragndrop/dragndrop.component';
import { ErrorComponent } from './components/file/error/error.component';
import { SelectorComponent } from './components/file/selector/selector.component';
import { PostInstallComponent } from './components/post-install/post-install.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TaggerContComponent } from './components/tagger/tagger-cont.component';
import { SelectorGuard } from './guards/selector.guard';

const routes: Routes = [
  { path: 'file', children: [
    { path: '',  component: DragndropComponent, },
    { path: 'selector', canActivate: [SelectorGuard], component: SelectorComponent },
    { path: 'error', component: ErrorComponent },
  ]},
  { path: 'tagger', component: TaggerContComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'postInstall', component: PostInstallComponent },
  { path: '**', redirectTo: 'file' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
