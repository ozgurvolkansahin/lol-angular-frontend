import { Component, OnInit } from '@angular/core';
import { ChampionData } from 'app/@core/data/champion-data';
import { JsonData } from 'app/@core/data/json-data';
import { FreeChampions } from 'app/@core/models/champion-models/free-champs';
@Component({
  selector: 'ngx-free-champ-rotation',
  templateUrl: './free-champ-rotation.component.html',
  styleUrls: ['./free-champ-rotation.component.scss'],
})
export class FreeChampRotationComponent implements OnInit {
  defaultRegion = 'TR';
  freeChamps: FreeChampions;
  freeChampFinalList = [];
  imagePath = 'assets/dragontail-10.25.1/10.25.1/img/champion/';
  constructor(private championService: ChampionData,
    private jsonService: JsonData) {
   }

  ngOnInit(): void {
    this.jsonService.getChampionJSONData('10.25.1', 'tr_TR')
    .subscribe(result => {
      this.championService.getFreeChampions()
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
