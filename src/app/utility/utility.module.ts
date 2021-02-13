import { NgModule } from '@angular/core';
import { RankedPipe } from './pipe/ranked.pipe';
import { SummonerMatchItemTableComponent } from './components/summoner-match-item-table/summoner-match-item-table.component';
import { SummonerMatchInfoComponent } from './components/summoner-match-info/summoner-match-info.component';
import { NbCardModule, NbUserModule } from '@nebular/theme';
import { GameModePipe } from './pipe/gameMode.pipe';

@NgModule({
  declarations: [RankedPipe,
    SummonerMatchItemTableComponent,
    SummonerMatchInfoComponent,
    GameModePipe],
  imports: [
    NbUserModule,
    NbCardModule,
  ],
  exports: [RankedPipe,
    SummonerMatchItemTableComponent,
    SummonerMatchInfoComponent,
    GameModePipe,
  ],
})
export class UtilityModule {
}
