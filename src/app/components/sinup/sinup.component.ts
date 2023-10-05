import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {
  //declaration des variable globale : utilité = 1- utilisable dans n'importe quelle méthode 2- utilisable dans les fichier htm
  signupForm: FormGroup;
  errorMsg: string = "";
  imagePreview: string
  constructor(private X: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*\d).{5,}$/), Validators.maxLength(10)]],
      confirmPwd: ['', [Validators.required]],
      img: ['']
    },

      {
        validator: MustMatch('pwd', 'confirmPwd')
      });
    console.log(this.router.url);
  }
  //declaration des méthodes (méthode = fonction);
  signup() {
    let userToSave = this.signupForm.value;
    if (this.router.url == "/signup") {
      userToSave.role = "user"
    }
    if (this.router.url == "/signupAdmin") {
      userToSave.role = "admin"
    }
    // 2 eme méthode 
    // this.signupForm.value.role= (this.router.url=="/signup") ? "user" : "admin"; 
    // this.userService.signup(userToSave).subscribe(
    console.log('here is signup clicked', this.signupForm.value);
    this.userService.signup(userToSave, userToSave.img).subscribe(
      (response) => {
        console.log("Here Response After Signup : ", response);
        if (!response.msg) {
          this.errorMsg = "Email Exist";
        } else {
          this.router.navigate(["login"]);
        }
      }
    )
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
