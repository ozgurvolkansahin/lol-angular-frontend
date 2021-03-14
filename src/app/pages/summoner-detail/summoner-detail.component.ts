import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampionMasteryData } from 'app/@core/data/championMastery-data';
import { ChampionWLData } from 'app/@core/data/championWL-data';
import { EntryData } from 'app/@core/data/entry-data';
import { JsonData } from 'app/@core/data/json-data';
import { MatchIDData } from 'app/@core/data/matchID-data';
import { ChampionMasteriesModel } from 'app/@core/models/champion-masteries-models/champion-masteries';
import { Entry } from 'app/@core/models/entry-models/entry';
import { RunesReforged } from 'app/@core/models/json-models/runesReforged';
import { MatchReferenceDto } from 'app/@core/models/match-models/match';
import { ParticipantDto } from 'app/@core/models/match-models/matchListDto';

@Component({
  selector: 'ngx-summoner-detail',
  templateUrl: './summoner-detail.component.html',
  styleUrls: ['./summoner-detail.component.scss'],
})
export class SummonerDetailComponent implements OnInit {
  matchData: MatchReferenceDto[];
  wlData: any;
  summonerEntryData: Entry[];
  summonerChampionMasteryData: ChampionMasteriesModel;
  summonerInfo: ParticipantDto;
  champData;
  summonerJsonData;
  runesReforged: RunesReforged[] = [];
  promise;

  constructor(private matchIDService: MatchIDData,
    private entryService: EntryData,
    private championMasteryService: ChampionMasteryData,
    private wlService: ChampionWLData,
    private route: ActivatedRoute,
    private jsonService: JsonData,
    private router: Router) {
      this.getData();
      const routedServer = this.route.snapshot.paramMap.get('server');
      const routedSummoner = this.route.snapshot.paramMap.get('summonerName');
      this.promise.then((res) => {
        this.getMatchData(routedSummoner, routedServer);
        this.getEntryData(routedSummoner, routedServer);
        this.getChampionMasteryData(routedSummoner, routedServer);
        this.getWLData(routedSummoner, routedServer);
      });
  }

  ngOnInit(): void {
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

  getMatchData(summonerName?: string, server?: string, refresh?: boolean) {
    this.matchIDService.getMatchData(summonerName, server, refresh).subscribe(r => {
      this.matchData = r.data;
      r.data.forEach(x => {
        x.summonerMatchDetail.championName = this.findChampion(x.summonerMatchDetail.championId);
        x.summonerMatchDetail.perkPrimaryStyleName = this.findRunes(x.summonerMatchDetail.stats.perkPrimaryStyle);
        x.summonerMatchDetail.perkSubStyleName = this.findRunes(x.summonerMatchDetail.stats.perkSubStyle);
        x.summonerMatchDetail.spell1Name = this.findSpells(x.summonerMatchDetail.spell1Id);
        x.summonerMatchDetail.spell2Name = this.findSpells(x.summonerMatchDetail.spell2Id);
        x.summonerMatchDetail.mvp = this.ifMVP(x);
      });
    });
  }

  getEntryData(summonerName?: string, server?: string, refresh?: boolean) {
    this.entryService.getEntryData(summonerName, server, refresh).subscribe(r => {
      this.summonerEntryData = r.data;
      this.summonerEntryData.forEach(x => {
        x.tier = x.tier.substring(0, 1) + x.tier.substring(1).toLowerCase();
      });
    });
  }

  getWLData(summonerName?: string, server?: string, refresh?: boolean) {
    this.wlService.getWL(summonerName, server, refresh).subscribe(r => {
      this.wlData = r.data;
      this.wlData.forEach(x => {
        x.totalWins = x.filter(a => a.win);
        x.totalLosses = x.filter(a => !a.win);
        x.championName = this.findChampion(x[0].champion);
        x.totalKills = (x.reduce((sum, y) => sum + y.kills, 0) / x.length).toFixed(2);
        x.totalAssists = (x.reduce((sum, y) => sum + y.assists, 0) / x.length).toFixed(2);
        x.totalDeaths = (x.reduce((sum, y) => sum + y.deaths, 0) / x.length).toFixed(2);
        x.minions = (x.reduce((sum, y) => sum + y.minions, 0) / x.length).toFixed(2);
        x.winRate = (x.filter(y => y.win).length / x.length * 100).toFixed(2);
      });
    });
  }

  getChampionMasteryData(summonerName?: string, server?: string, refresh?: boolean) {
    this.championMasteryService.getChampionMasteries(summonerName, server, refresh).subscribe(r => {
      // data returns as ordered DESC
      this.summonerChampionMasteryData = r.data;
      this.summonerChampionMasteryData.championMasteries.forEach(x => {
        x.championName = this.findChampion(x.championId);
      });
      // this.summonerChampionMasteryData.championMasteries
      // .map(x => Object.assign({}, x.championName = this.findChampion(x.championId)))
    });
  }

  refreshSummonerData() {
    const routedServer = this.route.snapshot.paramMap.get('server');
    const routedSummoner = this.route.snapshot.paramMap.get('summonerName');
    this.getMatchData(routedSummoner, routedServer, true);
    this.getEntryData(routedSummoner, routedServer, true);
    this.getChampionMasteryData(routedSummoner, routedServer, true);
    // this.getWLData(routedSummoner, routedServer, true);
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

  onSummonerFromTableSelected(e) {
    // this.router.navigate([]);
    window.location.replace(`pages/summoner-detail/${e.server}/${e.summonerName}`);
  }

  ifMVP(data: MatchReferenceDto) {
    let isMVP = true;
    const playerDamage = data.summonerMatchDetail.stats.totalDamageDealtToChampions;
    const relatedTeam = data.matchDTO.participants.filter(x => x.teamId === data.summonerMatchDetail.teamId);
    for(let i = 0; i < relatedTeam.length; i++) {
      if (playerDamage < relatedTeam[i].stats.totalDamageDealtToChampions) {
        isMVP = false;
        return;
      }
    }
    return isMVP;
  }
}
