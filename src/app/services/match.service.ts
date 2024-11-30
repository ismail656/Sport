import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //matchURL : backend Adress
  matchURL: string = "http://localhost:3000/matches"
  //Http : livreur 

  constructor(private http: HttpClient) { }
  //Declaration et developpement des méthodes du service
  //Request : Retour un tbleau 
  displayAllMatches() {
    return this.http.get<{ matches: any }>(this.matchURL)
  }

  //request : One Object
  getMatchByID(id : any) {
    return this.http.get<{ match: any }>(`${this.matchURL}/${id}`)
    // return this.http.get(this.matchURL +"/" +id) // deuxiéme méthode
  }

  searchMatchByScore(score : any) {
    return this.http.get<{matche: any, message : string}>(`${this.matchURL}/search/${score}`)
    // return this.http.get(this.matchURL +"/" +id) // deuxiéme méthode
  }

  //Request : Boolean
  addMatch(obj: any) {
    return this.http.post<{ isAdded: boolean }>(this.matchURL, obj)
  }

  //Request : Boolean
  deleteMatchById(id:number){
    return this.http.delete<{isDeleted:boolean}>(`${this.matchURL}/${id}`);
  }

  //Request : Boolean
  editMatch(obj) {
    return this.http.put<{ isEdit: boolean }>(this.matchURL, obj)
  }

  /* searchMatchByScores(score : number) {
    return this.http.get(`${this.matchURL}/${score}`)
  }*/
}
