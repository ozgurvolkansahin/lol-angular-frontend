import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <div class="row">
    <span class="created-by">
      Created by <b>pgil the Savior</b> {{date | date: 'yyyy'}}, © ---
      Bronzelo isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
    </span>
</div>
  `,
})
export class FooterComponent {
  date: Date = new Date();
}
