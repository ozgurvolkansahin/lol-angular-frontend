import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { FreeChampRotationComponent } from './free-champ-rotation/free-champ-rotation.component';
import { ChampDetailsComponent } from './champ-details/champ-details.component';
import { SummonerDetailComponent } from './summoner-detail/summoner-detail.component';
import { MultipleSearchComponent } from './multiple-search/multiple-search.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'live-tracking/:server/:summonerName',
      component: DashboardComponent,
    },
    {
      path: 'live-tracking',
      component: DashboardComponent,
    },
    {
      path: 'multiple-search',
      component: MultipleSearchComponent,
    },
    {
      path: 'summoner-detail',
      component: SummonerDetailComponent,
    },
    {
      path: 'summoner-detail/:server/:summonerName',
      component: SummonerDetailComponent,
    },
    {
      path: 'free-champs',
      component: FreeChampRotationComponent,
    },
    {
      path: 'champ-details/:name',
      component: ChampDetailsComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'live-tracking',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
