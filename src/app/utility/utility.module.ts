import { NgModule } from '@angular/core';
import { RankedPipe } from './pipe/ranked.pipe';

@NgModule({
    declarations: [RankedPipe],
    imports: [

    ],
    exports: [RankedPipe],
  })
export class UtilityModule {
}
