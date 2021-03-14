import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-multiple-search',
  templateUrl: './multiple-search.component.html',
  styleUrls: ['./multiple-search.component.scss'],
})
export class MultipleSearchComponent implements OnInit {
  dataList = [];
  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
    this.dataList = this.router.getCurrentNavigation().extras.state.data;
    } else {
      this.router.navigate(['pages/live-tracking']);
    }
  }

  ngOnInit(): void {
  }

}
