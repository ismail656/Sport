import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userURL: string = "http://localhost:3000/users";
  
  constructor(private http: HttpClient) { }
  
  displayAllUsers() {
    return this.http.get(this.userURL);
  }
  getUserById(id: number) {
    return this.http.get(`${this.userURL}/${id}`);
  }
  signup(user: any, file: File) {  
    let formData = new FormData()
    formData.append("firstName", user.firstName)
    formData.append("lastName", user.lastName)
    formData.append("email", user.email)
    formData.append("pwd", user.pwd)
    formData.append("role", user.role)
    formData.append("img", file)
    return this.http.post<{ msg: boolean }>(this.userURL + "/signup", formData)
  }
  logIn(obj: any) {
    return this.http.post<{ msg: string, token: string }>(this.userURL + "/login", obj)
  }
  deleteUserById(id: number) {
    return this.http.delete(`${this.userURL}/${id}`)
  }
  editUserById(obj: any) {
    return this.http.put(this.userURL, obj)
  }

}
