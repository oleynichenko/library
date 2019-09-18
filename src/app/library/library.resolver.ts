import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {LibraryService} from './library.service';

@Injectable()
export class LibraryResolver implements Resolve<any> {
  constructor(private libraryService: LibraryService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const lang = route.params.lang;

    return this.libraryService.getLibraryData(lang);
  }
}
