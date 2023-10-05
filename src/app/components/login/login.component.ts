import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  obj: any = {};
  x: string = "emailValue"
  errorMsg: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.userService.logIn(this.obj).subscribe(
      (response) => {
        console.log('here response from backend after login', response);
        if (response.msg != "2") {
          this.errorMsg = "Please check your Email or PWD"
        } else {
          sessionStorage.setItem("token", response.token);
          this.router.navigate([""]);
        }
      }
    );
  }

}
