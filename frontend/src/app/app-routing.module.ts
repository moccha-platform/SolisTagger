import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadComponent } from './components/load/load.component';
import { MatchsComponent } from './components/matchs/matchs.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo:'load' },
  { path:'load', component: LoadComponent },
  { path:'matchs', component: MatchsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
