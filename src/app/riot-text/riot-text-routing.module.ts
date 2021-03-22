import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { RiotTextComponent } from './rt/riot-text.component';

export const routes: Routes = [
  {
    path: '',
    component: RiotTextComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiotTextRoutingModule {
}
