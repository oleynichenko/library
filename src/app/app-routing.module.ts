import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppConfig} from './app.config';
import {PageComponent} from './library/page/page.component';
import {PageResolver} from './library/page/page.resolver';
import {LibraryComponent} from './library/library.component';
import {ErrorComponent} from './error/error.component';
import {LangGuardService} from './lang-guard.service';
import {BooksComponent} from './library/books/books.component';
import {LibraryResolver} from './library/library.resolver';
import {RoutesNames} from './app.model';

const routes: Routes = [
  {path: '', redirectTo: `${AppConfig.defaultLang}`, pathMatch: 'full'},
  {path: RoutesNames.ERROR, component: ErrorComponent},
  {path: ':lang',
    component: LibraryComponent,
    canActivate: [LangGuardService],
    resolve: {library: LibraryResolver},
    children: [
      {path: '', component: BooksComponent},
      {path: ':page',
        resolve: {page: PageResolver},
        component: PageComponent
      }
    ]
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    LangGuardService,
    PageResolver,
    LibraryResolver
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
