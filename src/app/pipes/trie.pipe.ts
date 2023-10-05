import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trie'
})
export class TriePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
