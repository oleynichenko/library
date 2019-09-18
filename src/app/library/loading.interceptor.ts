import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LibraryService} from './library.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private libraryService: LibraryService) {}
  activeRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('appInterfaceDisabled')) {

      this.activeRequests++; // For OPTIONS
      this.libraryService.startLoading();

      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;

          if (this.activeRequests === 0) {
            this.libraryService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
