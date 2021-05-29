import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { environment } from 'environments/environment';
import { ChampionData } from './data/champion-data';
import { ChampionService } from './utils/champion.service';
import { SpectatorData } from './data/spectator-data';
import { SpectatorService } from './utils/spectator.service';
import { JsonData } from './data/json-data';
import { JsonService } from './utils/json.service';
import { ServerData } from './data/servers-data';
import { ServerService } from './utils/servers.service';
import { EntryData } from './data/entry-data';
import { EntryService } from './utils/entry.service';
import { MatchIDData } from './data/matchID-data';
import { MatchIDService } from './utils/matchID.service';
import { ChampionMasteryData } from './data/championMastery-data';
import { ChampionMasteryService } from './utils/championMastery.service';
import { ChampionWLData } from './data/championWL-data';
import { ChampionWLService } from './utils/championWL.service';
import { MatchService } from './utils/match.service';
import { MatchData } from './data/match-data';
import { PlayerData } from './data/player.data';
import { PlayerService } from './utils/player.service';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: ChampionData, useClass: ChampionService },
  { provide: SpectatorData, useClass: SpectatorService },
  { provide: JsonData, useClass: JsonService },
  { provide: ServerData, useClass: ServerService },
  { provide: MatchIDData, useClass: MatchIDService },
  { provide: EntryData, useClass: EntryService },
  { provide: ChampionMasteryData, useClass: ChampionMasteryService },
  { provide: ChampionWLData, useClass: ChampionWLService },
  { provide: MatchData, useClass: MatchService },
  { provide: PlayerData, useClass: PlayerService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiUrl + '/auth',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        login: {
          // ...
          endpoint: '/login',
        },
        register: {
          // ...
          endpoint: '/register',
        },
        logout: {
          // ...
          endpoint: '/logout',
        },
        resetPass: {
          endpoint: '/reset_password',
          method: 'post',
          resetPasswordTokenKey: null,
        },
        requestPass: {
          endpoint: '/request_password',
        },
      }),
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
