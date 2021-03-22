import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NbCardModule, NbMenuModule, NbInputModule, NbUserModule, NbAccordionModule, NbListModule, NbBadgeModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { DashboardModule } from 'app/pages/dashboard/dashboard.module';
import { MiscellaneousModule } from 'app/pages/miscellaneous/miscellaneous.module';
import { UtilityModule } from 'app/utility/utility.module';
import { RiotTextRoutingModule } from './riot-text-routing.module';
import { RiotTexttComponent } from './riot-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbLayoutModule,
    RiotTextRoutingModule,
    NbCardModule,
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
    RiotTexttComponent,
  ],
})
export class RiotTextModule {
}
