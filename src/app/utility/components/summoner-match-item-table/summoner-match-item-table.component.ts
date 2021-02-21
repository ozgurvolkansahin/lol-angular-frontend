import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RunesReforged } from 'app/@core/models/json-models/runesReforged';
import { MatchDTO, ParticipantDto } from 'app/@core/models/match-models/matchListDto';
import { isUndefined } from 'util';

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
  constructor() {
  }

  ngOnInit(): void {
    this.manipulateData();
  }

  manipulateData() {
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
    if (this.matchData.gameMode === 'CLASSIC') {
      this.team1 = this.orderTeam(this.matchData.participants.filter(x => x.teamId === 100));
      this.team2 = this.orderTeam(this.matchData.participants.filter(x => x.teamId === 200));
    }
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

  orderTeam(team) {
    const newList = [undefined, undefined, undefined, undefined, undefined];
    const errorList = [];
    team.forEach(item => {
      if (item.timeline.lane === 'TOP') {
        if (newList[0] === undefined) {
          newList.splice(0, 1, item);
        } else {
          errorList.push(item);
        }

      } else if (item.timeline.lane === 'JUNGLE') {
        if (newList[1] === undefined) {
          newList.splice(1, 1, item);
        } else {
          errorList.push(item);
        }

      } else if (item.timeline.lane === 'MIDDLE') {
        if (newList[2] === undefined) {
          newList.splice(2, 1, item);
        } else {
          errorList.push(item);
        }

      } else if (item.timeline.lane === 'BOTTOM' && item.timeline.role === 'DUO_CARRY') {
        if (newList[3] === undefined) {
          newList.splice(3, 1, item);
        } else {
          errorList.push(item);
        }

      } else if (item.timeline.lane === 'BOTTOM' && item.timeline.role === 'DUO_SUPPORT') {
        if (newList[4] === undefined) {
          newList.splice(4, 1, item);
        } else {
          errorList.push(item);
        }

      } else {
        errorList.push(item);
      }
    });
    let breakFor = false;
    errorList.forEach(x => {
      breakFor = false;
      newList.forEach((y, i) => {
        if (y === undefined && !breakFor) {
          newList.splice(i, 1, x);
          breakFor = true;
        }
      });
    });
    return newList;
  }
}
