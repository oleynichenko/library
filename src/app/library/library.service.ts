import {Inject, Injectable, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Direction} from '@angular/cdk/bidi';

import {API_ENDPOINT, APP_CONFIG} from '../app.config';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LibraryService {
  dir: Direction;
  loadingStatus = new BehaviorSubject<boolean>(false);
  libraryData = new BehaviorSubject(null);
  renderer: Renderer2;

  constructor(private http: HttpClient,
              @Inject(API_ENDPOINT) private apiEndpoint,
              private translate: TranslateService,
              private router: Router,
              @Inject(APP_CONFIG) private config,
              private snackBar: MatSnackBar) { }

  setDirection(lang) {
    this.dir = (lang === 'he') ? 'rtl' : 'ltr';
  }

  startLoading() {
    this.loadingStatus.next(true);
  }

  stopLoading() {
    this.loadingStatus.next(false);
  }

  getPage(pageId, langId) {
    const url = `${this.apiEndpoint}/page/${this.config.library}/${pageId}/${langId}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getLibraryLangs() {
    const url = `${this.apiEndpoint}/library/langs/${this.config.library}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options);
  }

  getLibraryData(lang) {
    const url = `${this.apiEndpoint}/library/data/${this.config.library}/${lang}`;

    const options = {
      headers: {appInterfaceDisabled: 'true'}
    };

    return this.http.get(url, options).pipe(
      tap((data: any) => {
        this.translate.use(data.langId);
        this.libraryData.next(data);
      }),
    );
  }

  changeTypography(lang) {
    if (lang === 'he') {
      this.renderer.addClass(document.body, 'he-theme');
    } else {
      this.renderer.removeClass(document.body, 'he-theme');
    }
  }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {duration});
  }

  onLangMenuChanges(langId) {
    const newLangUrl = this.router.url.replace(
      `/${this.translate.currentLang}`,
      `/${langId}`
    );

    this.router.navigateByUrl(newLangUrl);
  }
}
