import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {

  transform(ch: string) {
    let result: string = "";
    let concat: string = "";
    let voy: string = "aAeEiIoOuUyY";
    for (let i = 0; i < ch.length; i++) {
      concat = ch[i];
      for (let j = 0; j < voy.length; j++) {
        if (ch[i] == voy[j]) {
          concat = '*';
          break
        }
      }
      result = result + concat;
    }
    return result
  }

}
