import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-three-columns-layout>
      <router-outlet></router-outlet>
    </ngx-three-columns-layout>
  `,
})
export class RiotTexttComponent {
}
