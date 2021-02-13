import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { JsonData } from 'app/@core/data/json-data';
import { ServerData } from 'app/@core/data/servers-data';
import { SpectatorData } from 'app/@core/data/spectator-data';
import { RunesReforged } from 'app/@core/models/json-models/runesReforged';
import { ServerModel } from 'app/@core/models/server-models/server-model';
import { BannedChampion, CurrentGameInfo, CurrentGameParticipant } from 'app/@core/models/spectator/spectator-model';
import { globalVariables } from 'globalVariables';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  summonerName: string;
  routedServer = null;
  routedSummoner = null;
  constructor(
    private spectatorService: SpectatorData,
    private jsonService: JsonData,
    private serverService: ServerData,
    private toast: NbToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      this.routedServer = this.route.snapshot.paramMap.get('server');
      this.routedSummoner = this.route.snapshot.paramMap.get('summonerName');
      this.getData();
      this.getServers();
      if (this.routedServer !== null && this.routedSummoner !== null) {
        this.server = this.routedServer;
        this.summonerName = this.routedSummoner;
        this.getLiveMatch();
      }
  }
  ddVersion = globalVariables.ddVersion;
  team1: CurrentGameParticipant[] = [];
  team1BannedChamps: BannedChampion[] = [];
  team2 = [];
  servers: ServerModel;
  server: string = 'tr';
  team2BannedChamps: BannedChampion[] = [];
  currentGameInfo: CurrentGameInfo;
  champData;
  summonerJsonData;
  runesReforged: RunesReforged[] = [];
  promise;
  ngOnInit() {
    // this.getLiveMatchMock();
  }

  getServers() {
    this.serverService.getServers().subscribe(r => {
      this.servers = r.data;
    });
  }

  getData() {
    this.promise = new Promise((resolve, reject) => {
      this.jsonService.getChampionJSONData()
      .subscribe(res => {
        this.champData = res.data;
        this.jsonService.getRunesReforged()
        .subscribe(res2 => {
          this.runesReforged = res2;
        });
        this.jsonService.getSummonerData()
        .subscribe(res3 => {
          this.summonerJsonData = res3.data;
          resolve('OK');
        });
      });
    });
  }

  getLiveMatch() {
    this.router.navigate(['/pages/live-tracking/' + this.server + '/' + this.summonerName])
    this.promise.then(res => {
      this.spectatorService.getSummonerActiveGame(this.summonerName, this.server)
      .subscribe(result => {
        if (result.data === null) {
          this.toast.danger('Bulunamadı', 'Sihirdar aktif bir oyunda değil!');
          this.router.navigate(['/pages/live-tracking']);

          return;
        }
        this.currentGameInfo = result.data;
        // team 1 data optimization
        this.team1 = this.currentGameInfo.participants.filter(x => x.teamId === 100);
        this.team1.map(x => Object.assign({}, x.championName
           = this.findChampion(x.championId)));
        this.team1.map(x => Object.assign({}, x.spell1Name
           = this.findSpells(x.spell1Id)));
        this.team1.map(x => Object.assign({}, x.spell2Name
           = this.findSpells(x.spell2Id)));
        this.team1.map(x => Object.assign({}, x.perks.perkStyleName
            = this.findRunes(x.perks.perkStyle)));
        this.team1.map(x => Object.assign({}, x.perks.perkSubStyleName
            = this.findRunes(x.perks.perkSubStyle)));

        // team 2 data optimization
        this.team2 = this.currentGameInfo.participants.filter(x => x.teamId === 200);
        this.team2.map(x => Object.assign({}, x.championName
           = this.findChampion(x.championId)));
        this.team2.map(x => Object.assign({}, x.spell1Name
           = this.findSpells(x.spell1Id)));
          this.team2.map(x => Object.assign({}, x.spell2Name
          = this.findSpells(x.spell2Id)));
        this.team2.map(x => Object.assign({}, x.perks.perkStyleName
            = this.findRunes(x.perks.perkStyle)));
        this.team2.map(x => Object.assign({}, x.perks.perkSubStyleName
            = this.findRunes(x.perks.perkSubStyle)));

        // banned champions
        this.team1BannedChamps = this.currentGameInfo.bannedChampions.filter(x => x.teamId === 100);
        this.team1BannedChamps.map(x => Object.assign({}, x.championName
          = this.findChampion(x.championId)));
        this.team2BannedChamps = this.currentGameInfo.bannedChampions.filter(x => x.teamId === 200);
        this.team2BannedChamps.map(x => Object.assign({}, x.championName
          = this.findChampion(x.championId)));
      });
    });
  }

  getMatchHistory() {
    if (this.summonerName !== null &&
      this.summonerName !== undefined &&
      this.summonerName !== '') {
      this.spectatorService.getSummonerActiveGame(this.summonerName, this.server)
      .subscribe(result => {
      });
    } else {
      this.toast.danger('Sihirdar adınızı boş bırakamazsınız', 'Sihirdar adı giriniz');
    }
  }

  routeBack() {
    this.router.navigate(['pages/live-tracking']);
  }

  findChampion(id: number) {
    return Object.keys(this.champData).find(key => +this.champData[key].key === id);
  }

  findSpells(id: number) {
    return Object.keys(this.summonerJsonData).find(key => +this.summonerJsonData[key].key === id);
  }

  findRunes(id: number) {
    return this.runesReforged.find(x => x.id === id).icon;
  }
}
