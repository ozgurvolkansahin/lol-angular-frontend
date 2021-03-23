import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'ngx-riot-text',
  templateUrl: './riot-text.component.html',
  styleUrls: ['./riot-text.component.scss']
})
export class RiotTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const el = document.getElementById('mainHtml');
    const el2 = document.getElementById('mainHtml2');
    const el3 = document.getElementById('nb-global-spinner');
    document.head.remove();
    el.remove();
    el2.remove();
    el3.remove();
    const patt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi;
    const patt2 = /<div\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/div\s*>/gi;
    const patt3 = /<body\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/body\s*>/gi;
    const html = document.getElementsByTagName('html')[0];
    html.innerHTML =  html.innerHTML.replace(patt, '');
    html.innerHTML =  html.innerHTML.replace(patt2, '');
    html.innerHTML =  html.innerHTML.replace(patt3, 'a24de93e-318c-47d0-a8ad-9839d978163d');
  }

}
