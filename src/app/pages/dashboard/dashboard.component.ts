import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ChampionWLData } from 'app/@core/data/championWL-data';
import { JsonData } from 'app/@core/data/json-data';
import { PlayerData } from 'app/@core/data/player.data';
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

  summonerName;
  routedServer = null;
  routedSummoner = null;
  multipleWLData: any;
  previousCurrentGameInfo;
  previousSummoner;
  constructor(
    private spectatorService: SpectatorData,
    private jsonService: JsonData,
    private serverService: ServerData,
    private toast: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private championWLService: ChampionWLData,
    private playerData: PlayerData) {
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
  server: string = 'tr1';
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
    // if (this.previousSummoner === this.summonerName) {
    //   this.currentGameInfo = this.previousCurrentGameInfo;
    //   return;
    // }
    if ([...new Set(this.summonerName.split(',').map(x => x.trim()))].length > 1) {
      let summonerNameList = this.summonerName.split(',');
      summonerNameList = summonerNameList.map(x => x.trim());
      this.championWLService.getMultipleSummoners(summonerNameList, this.server)
      .subscribe(result => {
        this.multipleWLData = result.data;
        this.multipleWLData.forEach(x=> {
          x.details.forEach(y => {
            y.totalWins = y.filter(a => a.win).length;
            y.totalLosses = y.filter(a => !a.win).length;
            y.championName = this.findChampion(y[0].champion);
            y.totalKills = (y.reduce((sum, y) => sum + y.kills, 0) / y.length).toFixed(2);
            y.totalAssists = (y.reduce((sum, y) => sum + y.assists, 0) / y.length).toFixed(2);
            y.totalDeaths = (y.reduce((sum, y) => sum + y.deaths, 0) / y.length).toFixed(2);
            y.minions = (y.reduce((sum, y) => sum + y.minions, 0) / y.length).toFixed(2);
            y.winRate = (y.filter(y => y.win).length / y.length * 100).toFixed(2);
          });
        });
        this.router.navigate(['pages/multiple-search'], {state: {data: this.multipleWLData}});
      });
    } else {
      this.promise.then(res => {
        this.playerData.isPlayerExist(this.server, this.summonerName)
        .subscribe(playerResult => {
          if (!playerResult.data) {
              this.toast.danger('Bulunamadı', 'Böyle bir oyuncu bulunamadı!');
          } else {
            this.spectatorService.getSummonerActiveGame(this.summonerName, this.server)
            .subscribe(result => {
              if (result.data == null) {
                this.toast.danger('Bulunamadı', 'Aktif bir oyun bilgisi bulunamadı!');
                this.router.navigate(['/pages/summoner-detail', this.server, this.summonerName]);
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
          }
        });
      });
    }
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
    // this.previousCurrentGameInfo = this.currentGameInfo;
    // this.previousSummoner = this.summonerName;
    this.currentGameInfo = undefined;
  }

  onSummonerPaste(e) {
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData('text');
      if (pastedText.includes(' lobiye katıldı')) {
        setTimeout(() => {
          this.summonerName = pastedText.replaceAll(' lobiye katıldı', ',');
          this.summonerName = this.summonerName.substr(0, this.summonerName.length - 1);
        }, 20);
      } else if (pastedText.includes(' joined the lobby')) {
        setTimeout(() => {
          this.summonerName = pastedText.replaceAll(' joined the lobby', ',');
          this.summonerName = this.summonerName.substr(0, this.summonerName.length - 1);
        }, 20);
      } else if (pastedText.includes(' joined lobby')) {
        setTimeout(() => {
          this.summonerName = pastedText.replaceAll(' joined lobby', ',');
          this.summonerName = this.summonerName.substr(0, this.summonerName.length - 1);
        }, 20);
      }
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
