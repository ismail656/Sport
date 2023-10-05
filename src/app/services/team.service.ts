import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamURL : string ="http://localhost:3000/teams";

  constructor( private httpClient : HttpClient) { }

  addTeam(obj : any){
    console.log("Service obj : ",obj);
    return this.httpClient.post<{ isAdded: boolean }>(this.teamURL, obj); 
  }

  getAllTeams(){
    return this.httpClient.get<{teams : any}>(this.teamURL); 
  }
}
