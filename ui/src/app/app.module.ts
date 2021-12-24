import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";

/* Solis UI Kit ngx for Prod */
import { UikitModule } from 'libs/uikit';

/* UI Kit for Dev */
import { UIKitModule } from './modules/uikit.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragndropComponent } from './components/file/dragndrop/dragndrop.component';
import { SelectorComponent } from './components/file/selector/selector.component';
import { DragDirective } from './directives/drag.directive';
import { OverflowDetectorDirective } from './directives/overflow-detector.directive';
import { ValidFilePipe } from './pipes/valid-file.pipe';
import { ErrorComponent } from './components/file/error/error.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchComponent } from './components/settings/search/search.component';
import { UiComponent } from './components/settings/ui/ui.component';
import { TaggerSettingsComponent } from './components/settings/tagger-settings/tagger-settings.component';
import { TaggerContComponent } from './components/tagger/tagger-cont.component';
import { CacheComponent } from './components/settings/cache/cache.component';
import { ApisComponent } from './components/settings/apis/apis.component';
import { UpdatesComponent } from './components/settings/updates/updates.component';
import { FormsModule } from '@angular/forms';
import { AttributionsComponent } from './components/settings/attributions/attributions.component';
import { UithememodeComponent } from './components/settings/ui/uithememode/uithememode.component';

import { ipcRenderer, IpcRenderer } from "electron";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LanguageComponent } from './components/settings/language/language.component';
import { PostInstallComponent } from './components/post-install/post-install.component';
import { TaggedPipe } from './pipes/tagged.pipe';
import { SidebarComponent } from './components/tagger/sidebar/sidebar.component';
import { TaggerComponent } from './components/tagger/tagger/tagger.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { UrlToImg64Pipe } from './pipes/url-to-img64.pipe';

export const loadTranslations = ( http: HttpClient ) =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    DragndropComponent,
    SelectorComponent,
    DragDirective,
    OverflowDetectorDirective,
    ValidFilePipe,
    ErrorComponent,
    SettingsComponent,
    SearchComponent,
    UiComponent,
    TaggerSettingsComponent,
    TaggerContComponent,
    CacheComponent,
    ApisComponent,
    AttributionsComponent,
    UpdatesComponent,
    UithememodeComponent,
    LanguageComponent,
    PostInstallComponent,
    TaggedPipe,
    SidebarComponent,
    TaggerComponent,
    SanitizePipe,
    UrlToImg64Pipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    UikitModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (loadTranslations),
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
