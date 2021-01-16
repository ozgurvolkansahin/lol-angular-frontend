import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { SpectatorData } from 'app/@core/data/spectator-data';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  summonerName: string;
  constructor(
    private spectatorService: SpectatorData,
    private toast: NbToastrService) {
  }
  list=[1,2,3,4,5];
  ngOnInit() {
  }

  getMatchHistory() {
    if (this.summonerName !== null &&
      this.summonerName !== undefined &&
      this.summonerName !== '') {
      this.spectatorService.getSummonerActiveGame('iOnlyNeedSeconds')
      .subscribe(result => {
        console.log(result.data);
      });
    } else {
      this.toast.danger('Sihirdar adınızı boş bırakamazsınız', 'Sihirdar adı giriniz');
    }
  }
}
