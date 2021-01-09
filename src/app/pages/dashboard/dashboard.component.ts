import {Component, OnDestroy, OnInit} from '@angular/core';
import { SpectatorData } from 'app/@core/data/spectator-data';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    private spectatorService: SpectatorData) {
  }

  ngOnInit() {
    this.spectatorService.getSummonerActiveGame('BlackLittle')
    .subscribe(result => {
      console.log(result.data);
    });
  }
}
