import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from './material.module';
import {SimpleBarDirective} from './simple-bar.directive';
import {LoadingComponent} from './loading/loading.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    SimpleBarDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
    SimpleBarDirective,
    LoadingComponent,
    TranslateModule
  ]
})
export class SharedModule { }
