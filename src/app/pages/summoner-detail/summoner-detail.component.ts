import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryData } from 'app/@core/data/entry-data';
import { JsonData } from 'app/@core/data/json-data';
import { MatchIDData } from 'app/@core/data/matchID-data';
import { Entry } from 'app/@core/models/entry-models/entry';
import { RunesReforged } from 'app/@core/models/json-models/runesReforged';
import { MatchListDto, MatchReferenceDto } from 'app/@core/models/match-models/match';
import { MatchDTO, ParticipantDto } from 'app/@core/models/match-models/matchListDto';

@Component({
  selector: 'ngx-summoner-detail',
  templateUrl: './summoner-detail.component.html',
  styleUrls: ['./summoner-detail.component.scss'],
})
export class SummonerDetailComponent implements OnInit {
  matchData: MatchReferenceDto[];
  summonerEntryData: Entry[];
  summonerInfo: ParticipantDto;
  champData;
  summonerJsonData;
  runesReforged: RunesReforged[] = [];
  promise;

  constructor(private matchIDService: MatchIDData,
    private entryService: EntryData,
    private route: ActivatedRoute,
    private jsonService: JsonData,
    private router: Router) {
      this.getData();
      const routedServer = this.route.snapshot.paramMap.get('server');
      const routedSummoner = this.route.snapshot.paramMap.get('summonerName');
      this.promise.then((res) => {
        this.getMatchData(routedSummoner, routedServer);
        this.getEntryData(routedSummoner, routedServer);
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

  getMatchData(summonerName?: string, server?: string) {
    this.matchIDService.getMatchData(summonerName, server).subscribe(r => {
      this.matchData = r.data;
      r.data.forEach(x => {
        x.summonerMatchDetail.championName = this.findChampion(x.summonerMatchDetail.championId);
        x.summonerMatchDetail.perkPrimaryStyleName = this.findRunes(x.summonerMatchDetail.stats.perkPrimaryStyle);
        x.summonerMatchDetail.perkSubStyleName = this.findRunes(x.summonerMatchDetail.stats.perkSubStyle);
        x.summonerMatchDetail.spell1Name = this.findSpells(x.summonerMatchDetail.spell1Id);
        x.summonerMatchDetail.spell2Name = this.findSpells(x.summonerMatchDetail.spell2Id);
      });
    });
  }

  getEntryData(summonerName?: string, server?: string) {
    this.entryService.getEntryData(summonerName, server).subscribe(r => {
      this.summonerEntryData = r.data;
      this.summonerEntryData.forEach(x => {
        x.tier = x.tier.substring(0, 1) + x.tier.substring(1).toLowerCase();
      });
    });
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
}
