import { Component, Input, OnInit } from '@angular/core';
import { ParticipantDto } from 'app/@core/models/match-models/matchListDto';

@Component({
  selector: 'ngx-summoner-match-info',
  templateUrl: './summoner-match-info.component.html',
  styleUrls: ['./summoner-match-info.component.scss']
})
export class SummonerMatchInfoComponent implements OnInit {

  @Input() summonerInfo: ParticipantDto;

  constructor() { }

  ngOnInit(): void {
    console.log(this.summonerInfo);
  }

}
