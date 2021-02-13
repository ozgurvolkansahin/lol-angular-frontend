import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-three-columns-layout>
      <router-outlet></router-outlet>
    </ngx-three-columns-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
