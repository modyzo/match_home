import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalCase',
})
export class CapitalCasePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    let first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }
}
