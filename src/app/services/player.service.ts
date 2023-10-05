import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerURL: string = "http://localhost:3000/players"

  constructor(private http: HttpClient) { }

  displayAllPlayers() {
    return this.http.get(this.playerURL);
  }
  getPlayerByID(id: number) {
    return this.http.get(`${this.playerURL}/${id}`);
  }
  addPlayer(obj: any, file:File) {
    let formData = new FormData()
    formData.append("name",obj.firstName)
    formData.append("age",obj.lastName)
    formData.append("number",obj.email)
    formData.append("position",obj.pwd)
    formData.append("tId",obj.role)
    formData.append("img",file)
    return this.http.post<{ message : string }>(this.playerURL, obj);
  }
  deletePlayerById(id: number) {
    return this.http.delete(`${this.playerURL}/${id}`);
  }
  editPlayer(obj: any) {
    return this.http.put(this.playerURL, obj);
  }
}
