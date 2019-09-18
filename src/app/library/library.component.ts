import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';

import {APP_BREAKPOINTS, APP_CONFIG} from '../app.config';
import {LibraryService} from './library.service';
import {debounceTime, map} from 'rxjs/operators';
import {MenuItem} from '../app.model';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  title$: Observable<string>;
  menuItems$: Observable<MenuItem[]>;
  libraryLangs$: Observable<string[]>;

  isDesktop$: Observable<boolean>;
  paramsSubscription: Subscription;

  constructor(private translate: TranslateService,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private breakpointObserver: BreakpointObserver,
              public libraryService: LibraryService,
              @Inject(APP_CONFIG) private config,
              @Inject(APP_BREAKPOINTS) private breakPoints) {
    libraryService.renderer = renderer;
  }

  ngOnInit() {
    const lang = this.route.snapshot.params.lang;

    this.libraryService.setDirection(lang);
    this.translate.setDefaultLang(this.config.defaultLang);
    this.translate.use(lang);

    this.isLoading$ = this.libraryService.loadingStatus.pipe(
      debounceTime(300)
    );

    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.translate.use(params.lang);
        this.libraryService.setDirection(params.lang);
        this.libraryService.changeTypography(params.lang);
      });

    // this.libraryService.libraryData.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.title = data.title;
    //     this.menuItems = data.menu;
    //     this.libraryLangs = data.langs;
    //   }
    // );
    this.title$ = this.libraryService.libraryData
      .pipe(map((data => data.title)));

    this.menuItems$ = this.libraryService.libraryData
      .pipe(map((data => data.menu)));

    this.libraryLangs$ = this.libraryService.libraryData
      .pipe(map((data => data.langs)));

    this.isDesktop$ = this.breakpointObserver
      .observe([this.breakPoints.desktop]).pipe(
        map((state: BreakpointState) => state.matches)
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
