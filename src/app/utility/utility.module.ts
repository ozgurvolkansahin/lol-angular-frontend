import { NgModule } from '@angular/core';
import { RankedPipe } from './pipe/ranked.pipe';
import { SummonerMatchItemTableComponent } from './components/summoner-match-item-table/summoner-match-item-table.component';
import { SummonerMatchInfoComponent } from './components/summoner-match-info/summoner-match-info.component';
import { NbCardModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { GameModePipe } from './pipe/gameMode.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TierPipe } from './pipe/tier.pipe';

@NgModule({
  declarations: [RankedPipe,
    SummonerMatchItemTableComponent,
    SummonerMatchInfoComponent,
    GameModePipe,
    TierPipe
  ],
  imports: [
    NbUserModule,
    NbCardModule,
    CommonModule,
    NbTooltipModule,
  ],
  exports: [RankedPipe,
    SummonerMatchItemTableComponent,
    SummonerMatchInfoComponent,
    GameModePipe,
    TierPipe,
  ],
})
export class UtilityModule {
}
