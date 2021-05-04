import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoadComponent } from './components/load/load.component';

import { ButtonComponent } from './components/shared/button/button.component';
import { InputTextComponent } from './components/shared/input-text/input-text.component';

import { IpcService } from './services/ipc.service';
import { MatchsComponent } from './components/matchs/matchs.component';

import { DragndropDirective } from './directives/dragndrop.directive';
import { RangeSliderComponent } from './components/shared/range-slider/range-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadComponent,
    DragndropDirective,
    MatchsComponent,
    ButtonComponent,
    InputTextComponent,
    RangeSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
