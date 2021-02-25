import { NgModule } from '@angular/core';
import { NbAccordionModule, NbBadgeModule, NbCardModule, NbInputModule, NbListModule, NbMenuModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FreeChampRotationComponent } from './free-champ-rotation/free-champ-rotation.component';
import { ChampDetailsComponent } from './champ-details/champ-details.component';
import { SummonerDetailComponent } from './summoner-detail/summoner-detail.component';
import { UtilityModule } from 'app/utility/utility.module';
import { MultipleSearchComponent } from './multiple-search/multiple-search.component';


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
    NbBadgeModule,
  ],
  declarations: [
    PagesComponent,
    FreeChampRotationComponent,
    ChampDetailsComponent,
    SummonerDetailComponent,
    MultipleSearchComponent,
  ],
})
export class PagesModule {
}
