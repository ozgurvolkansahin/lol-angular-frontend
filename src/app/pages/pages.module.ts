import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule, NbInputModule, NbListModule, NbMenuModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FreeChampRotationComponent } from './free-champ-rotation/free-champ-rotation.component';
import { ChampDetailsComponent } from './champ-details/champ-details.component';
import { SummonerDetailComponent } from './summoner-detail/summoner-detail.component';
import { UtilityModule } from 'app/utility/utility.module';


@NgModule({
  imports: [
    NbCardModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbInputModule,
    NbUserModule,
    NbAccordionModule,
    UtilityModule,
    NbListModule,
  ],
  declarations: [
    PagesComponent,
    FreeChampRotationComponent,
    ChampDetailsComponent,
    SummonerDetailComponent,

  ],
})
export class PagesModule {
}
