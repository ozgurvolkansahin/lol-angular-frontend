import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'ranked'})
export class RankedPipe implements PipeTransform {
  transform(value: string) {
      return value === 'RANKED_SOLO_5x5' ? 'Solo Q' : 'Flex';
  }
}
