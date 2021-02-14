import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RunesReforged } from 'app/@core/models/json-models/runesReforged';
import { MatchDTO, ParticipantDto } from 'app/@core/models/match-models/matchListDto';

@Component({
  selector: 'ngx-summoner-match-item-table',
  templateUrl: './summoner-match-item-table.component.html',
  styleUrls: ['./summoner-match-item-table.component.scss'],
})
export class SummonerMatchItemTableComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  @Output() summonerName = new EventEmitter();
  @Input() matchData: MatchDTO;
  @Input() champData;
  team1: ParticipantDto[];
  team2: ParticipantDto[];
  asdas = 'sadlsadlasd';
  constructor() {
  }

  ngOnInit(): void {
    this.team1 = this.matchData.participants.filter(x => x.teamId === 100);
    this.team2 = this.matchData.participants.filter(x => x.teamId === 200);
    this.team1.map(x => Object.assign({},
      x.participant = this.matchData.participantIdentities.find(y => y.participantId === x.participantId),
    ));
    this.team2.map(x => Object.assign({},
      x.participant = this.matchData.participantIdentities.find(y => y.participantId === x.participantId),
    ));
    this.team1.map(x => Object.assign({}, x.championName
      = this.findChampion(x.championId)));
      this.team2.map(x => Object.assign({}, x.championName
        = this.findChampion(x.championId)));
  }

  onSummonerSelect(summonerName, server) {
    this.summonerName.emit({
      summonerName: summonerName,
      server: server,
    });
  }

  findChampion(id: number) {
    return Object.keys(this.champData).find(key => +this.champData[key].key === id);
  }
}
