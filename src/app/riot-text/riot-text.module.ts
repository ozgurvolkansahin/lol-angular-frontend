import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { UtilityModule } from 'app/utility/utility.module';
import { RiotTextRoutingModule } from './riot-text-routing.module';
import { RiotTexttComponent } from './riot-text.component';
import { RiotTextComponent } from './rt/riot-text.component';

@NgModule({
  imports: [
    CommonModule,
    RiotTextRoutingModule,
    UtilityModule,
  ],
  declarations: [
    RiotTexttComponent,
    RiotTextComponent,
  ],
  exports: [
    RiotTexttComponent,
    RiotTextComponent,
  ],
})
export class RiotTextModule {
}
