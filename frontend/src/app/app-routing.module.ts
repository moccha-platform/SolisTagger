import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadComponent } from './components/load/load.component';

const routes: Routes = [
  {path:'load', component: LoadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
