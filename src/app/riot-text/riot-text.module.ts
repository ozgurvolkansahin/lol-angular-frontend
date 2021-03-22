import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { ThemeModule } from 'app/@theme/theme.module';
import { RiotTextRoutingModule } from './riot-text-routing.module';
import { RiotTexttComponent } from './riot-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ThemeModule,
    RiotTextRoutingModule,
  ],
  declarations: [
    RiotTexttComponent,
  ],
})
export class RiotTextModule {
}
