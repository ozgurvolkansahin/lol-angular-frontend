import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FreeChampRotationComponent } from './free-champ-rotation/free-champ-rotation.component';
import { ChampDetailsComponent } from './champ-details/champ-details.component';

@NgModule({
  imports: [
    NbCardModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbInputModule,
  ],
  declarations: [
    PagesComponent,
    FreeChampRotationComponent,
    ChampDetailsComponent,
  ],
})
export class PagesModule {
}
