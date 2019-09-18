import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {LibraryService} from '../library.service';
import {APP_CONFIG} from '../../app.config';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private libraryService: LibraryService,
              @Inject(APP_CONFIG) private config,
              private router: Router) { }

  ngOnInit() {
    this.books$ = this.libraryService.libraryData
      .pipe(map((data => data.books)));
  }

  onBookClick(id) {
    this.router.navigateByUrl('http://localhost:4201');
  //   this.libraryService.getInterfaceLangs(id)
  //     .subscribe((langs: any[]) => {
  //       const requiredInterfaceLang = this.translate.currentLang;
  //       let interfaceLang;
  //
  //       if (langs.includes(requiredInterfaceLang)) {
  //         interfaceLang = requiredInterfaceLang;
  //       } else if (langs.includes(this.config.defaultLang)) {
  //         interfaceLang = this.config.defaultLang;
  //       } else {
  //         interfaceLang = langs[0];
  //       }
  //
  //       const bookUrl = this.router.url.replace(
  //         `/${requiredInterfaceLang}`,
  //         `/${interfaceLang}`) + '/library/' + id;
  //
  //       this.router.navigateByUrl(bookUrl);
  //     });
  }
}
