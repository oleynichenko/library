import {Component, Inject, OnInit, } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {API_ENDPOINT} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {LanguageMenuService} from './language-menu.service';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit {
  langMenu$: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private languageMenuService: LanguageMenuService,
              @Inject(API_ENDPOINT) private apiEndpoint) { }

  ngOnInit() {
    this.langMenu$ = this.languageMenuService.langMenu;
  }

  onLangMenuItemClick(langId) {
    // для плавного исчезновения langMenu
    setTimeout(() => {
      this.languageMenuService.onLangChanging(langId);
    }, 200);
  }
}
