import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {LibraryService} from './library.service';
import {LanguageMenuService} from './language-menu/language-menu.service';

@Injectable()
export class LibraryResolver implements Resolve<any> {
  constructor(private libraryService: LibraryService,
              private languageMenuService: LanguageMenuService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const lang = route.params.lang;

    return this.libraryService.getLibraryData(lang).pipe(
      switchMap((value: any) => {
        return this.languageMenuService.getLangMenu(lang, value.langs);
      })
    );
  }
}
