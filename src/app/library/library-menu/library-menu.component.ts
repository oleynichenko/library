import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../app.model';

@Component({
  selector: 'app-library-menu',
  templateUrl: './library-menu.component.html',
  styleUrls: ['./library-menu.component.scss']
})
export class LibraryMenuComponent implements OnInit {
  @Input() libraryMenuItems: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
