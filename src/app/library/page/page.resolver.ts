import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {LibraryService} from '../library.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class PageResolver implements Resolve<any> {
  constructor(private libraryService: LibraryService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    const pageId = route.params.page;
    const langId = route.parent.params.lang;

    return this.libraryService.getPage(pageId, langId);
  }
}
