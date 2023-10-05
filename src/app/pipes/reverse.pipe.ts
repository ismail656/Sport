import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch: string) {
    var chinv : string ="";
    for (let i = 0; i < ch.length; i++) {
      chinv =  ch[i] + chinv;
    }
    return chinv

  }

}
