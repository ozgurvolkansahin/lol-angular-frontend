import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'tier'})
export class TierPipe implements PipeTransform {
  transform(value) {
      return value.substring(0, 1) + value.substring(1).toLowerCase();
  }
}
