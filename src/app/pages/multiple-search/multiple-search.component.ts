import { Component, OnInit } from '@angular/core';
import { ChampionData } from 'app/@core/data/champion-data';
import { JsonData } from 'app/@core/data/json-data';
import { FreeChampions } from 'app/@core/models/champion-models/free-champs';
@Component({
  selector: 'ngx-multiple-search',
  templateUrl: './multiple-search.component.html',
  styleUrls: ['./multiple-search.component.scss'],
})
export class MultipleSearchComponent implements OnInit {
  defaultRegion = 'TR';
  freeChamps: FreeChampions;
  freeChampFinalList = [];
  server = 'tr';
  imagePath = 'assets/dragontail/dragontail/img/champion/';
  constructor(private championService: ChampionData,
    private jsonService: JsonData) {
   }

  ngOnInit(): void {
    this.jsonService.getChampionJSONData('tr_TR')
    .subscribe(result => {
      this.championService.getFreeChampions(this.server)
      .subscribe(champs => {
        this.freeChamps = champs.data;
        this.freeChamps.freeChampionIds.forEach(x => {
          this.freeChampFinalList.push(result.data[Object.keys(result.data).find(key => +result.data[key].key === x)]);
        });
        this.freeChampFinalList.forEach(x => {
          x.image.full = this.imagePath + x.image.full;
          });
      });
    });
  }

  returnStatus(tag: string) {
    switch (tag.toLowerCase()) {
      case 'assassin':
        return 'danger';
      case 'support':
        return 'primary';
      case 'mage':
        return 'primary';
      case 'tank':
        return 'success';
      case 'marksman':
        return 'warning';
      default:
        return 'success';
    }
  }

}