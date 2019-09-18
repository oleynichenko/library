import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LibraryService} from '../library.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  content$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private libraryService: LibraryService) { }

  ngOnInit() {
    this.content$ = this.route.data.pipe(
      map((data: any) => data.page.content)
    );
  }
}
