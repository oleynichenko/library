import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LibraryComponent} from './library.component';
import {SubMenuComponent} from './sub-menu/sub-menu.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {LanguageMenuComponent} from './language-menu/language-menu.component';
import {LibraryMenuComponent} from './library-menu/library-menu.component';
import {BooksComponent} from './books/books.component';
import {PageComponent} from './page/page.component';
import {LibraryService} from './library.service';
import {LanguageMenuService} from './language-menu/language-menu.service';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryMenuComponent,
    SubMenuComponent,
    FooterComponent,
    LanguageMenuComponent,
    BooksComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [LibraryService, LanguageMenuService]
})
export class LibraryModule { }
