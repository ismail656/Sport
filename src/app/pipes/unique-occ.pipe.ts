import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueOcc'
})
export class UniqueOccPipe implements PipeTransform {

  transform(ch: string): any {
    var tabResult: any = [{ "original word": ch }];//Cette ligne est pour le teste
    var c: string = "";
    var unique: string = "";
    var nbr: number = 0;
    //Créer une chaine de carractaire sans répetition des carractaire
    //Ceci peut etre déclarer comme une fonction (méthode) : ceerChaineSansRepetition(ch) : retourne une chaine de caractaire
    for (let i = 0; i < ch.length; i++) {
      c = ch[i] //pour chaque carractaire, affecter ç valeu à la variable c
      for (let j = 0; j < unique.length; j++) {
        if (ch[i] == unique[j]) {
          c = ""//si le caractaire existe déja dans la chaine "unique", ecraser le contenu du c
        }
      }
      unique = unique + c;//concatiner unique + c, la valeur de c soit ch[i] ou une chaine vide
    }
    tabResult[1] = { "word sans repetition": unique }; // cette Ligne est poue le teste
    //Calculer le nombre d'occure de unqiue[i] dans "ch". 
    //cette partie peut etre réaliser dans une méthodes : calculeOcrance(unique,ch) = retourne un tableau d'objet [{caract : , nbrOcure : }]
    for (let i = 0; i < unique.length; i++) {
      nbr = 0
      for (let j = 0; j < ch.length; j++) {
        if (unique[i] == ch[j]) {
          nbr++;
        }
      }
      tabResult.push({ cract: unique[i], nbrOccur: nbr });
    }
    return tabResult
    /*
    La méthode peut etre réaliser comme suit : 
    transform (ch){
      unique = ceerChaineSansRepetition(ch);
      tableauResultat = calculeOcrance(unique,ch);
      return tableauResultat
      //Bien sur ç manque la declaration des variable
    }
    */
  }

}
