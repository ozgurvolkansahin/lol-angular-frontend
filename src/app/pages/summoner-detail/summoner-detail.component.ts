import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryData } from 'app/@core/data/entry-data';
import { MatchIDData } from 'app/@core/data/matchID-data';
import { Entry } from 'app/@core/models/entry-models/entry';

@Component({
  selector: 'ngx-summoner-detail',
  templateUrl: './summoner-detail.component.html',
  styleUrls: ['./summoner-detail.component.scss']
})
export class SummonerDetailComponent implements OnInit {
  matchData;
  summonerEntryData: Entry[];
  constructor(private matchIDService: MatchIDData,
    private entryService: EntryData,
    private route: ActivatedRoute) {
      // const routedServer = this.route.snapshot.paramMap.get('server');
      // const routedSummoner = this.route.snapshot.paramMap.get('summonerName');
      matchIDService.getMatchData('pgilthesavior', 'tr').subscribe(r => {
      this.matchData = r.data;
    });
    entryService.getEntryData('pgilthesavior', 'tr').subscribe(r => {
      this.summonerEntryData = r.data;
      this.summonerEntryData.forEach(x => {
        x.tier = x.tier.substring(0, 1) + x.tier.substring(1).toLowerCase();
      });
    });
  }

  ngOnInit(): void {
  }

}
