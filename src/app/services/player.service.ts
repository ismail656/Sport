import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerURL: string = "http://localhost:3000/players"

  constructor(private http: HttpClient) { }

  displayAllPlayers() {
    return this.http.get<{ players: any }>(this.playerURL);
  }
  getPlayerById(id: number) {
    return this.http.get<{ player: any }>(`${this.playerURL}/${id}`);
  }
  addPlayer(obj: any, file:File) {
    let formData = new FormData()
    formData.append("name",obj.name)
    formData.append("age",obj.nbr)
    formData.append("nbr",obj.age)
    formData.append("position",obj.position)
    formData.append("teamId",obj.teamId)
    formData.append("img",file)
    return this.http.post<{ message : string }>(this.playerURL, formData);
  }
  deletePlayerById(id: number) {
    return this.http.delete(`${this.playerURL}/${id}`);
  }
  editPlayer(obj: any,file:File) {
    let formData = new FormData()
    formData.append("id",obj.playerId)
    formData.append("name",obj.name)
    formData.append("age",obj.nbr)
    formData.append("nbr",obj.age)
    formData.append("position",obj.position)
    formData.append("teamId",obj.teamId)
    formData.append("img",file)
    return this.http.put<{ isEdit : boolean }>(this.playerURL, formData);
  }
}
