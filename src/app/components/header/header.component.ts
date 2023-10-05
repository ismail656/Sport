import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 
export class HeaderComponent implements OnInit {
user : any = {}; 
  constructor() { }

  ngOnInit() {
  }

  isLoggedIn() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user=this.decodeToken(jwt);
      console.log(this.user)
    }
    return !!jwt;
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  logout(){
    sessionStorage.removeItem("token");
  }
}
