import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {LibraryModule} from './library/library.module';
import {ErrorComponent} from './error/error.component';
import {API_ENDPOINT, APP_BREAKPOINTS, APP_CONFIG, AppConfig} from './app.config';
import {LoadingInterceptor} from './library/loading.interceptor';
import {ServerErrorInterceptor} from './server-error.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {GlobalErrorHandler} from './error/global-error-handling';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    LibraryModule,
    AppRoutingModule
  ],
  providers: [
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true},
    {provide: API_ENDPOINT, useValue: AppConfig.apiEndpoint},
    {provide: APP_BREAKPOINTS, useValue: AppConfig.breakPoints},
    {provide: APP_CONFIG, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
