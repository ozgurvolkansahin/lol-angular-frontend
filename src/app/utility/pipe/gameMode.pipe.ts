import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'gamemode'})
export class GameModePipe implements PipeTransform {
  transform(value: string) {
      return value === 'CLASSIC' ? 'SOLO Q' : value;
  }
}
