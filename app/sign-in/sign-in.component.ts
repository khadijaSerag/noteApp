import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; //forms3
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

declare var $: any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(private _AuthService: AuthService, private _Router: Router) {
    //   دى عشان كل مااجى اعمل باك مايرجعنيش لصفحة الساين ان ولازم يعمل لوج اوت عشان يوديه للصفحة دى 
    if (this._AuthService.isloggedin()) {
      this._Router.navigate(['/profile']);
    }
  }

  error: any = "";

  signinForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]) //Minimum eight characters, at least one letter and one number:

  });

  checked: boolean = true;


  signin(signinForm: FormGroup) {
    console.log(signinForm);

    this.checked = false; //waiting .........

    if (signinForm.valid) {

      this._AuthService.signIn(signinForm.value).subscribe(response => {

        if (response.message == "success") {
          localStorage.setItem("currentUser", response.token);

          this.checked = true; // back to signin

          this._AuthService.savecurrentUserData();
          this._Router.navigate(["/profile"]);
        }
        else {
          this.error = response.message;
          this.checked = true;// back to signin
        }
        setInterval(() => {
          this.error = false;
        }, 6000);
      })

    }
  }

  ngOnInit(): void {

    $('#signIn').particleground({
      dotColor: 'rgb(228, 133, 74)',
      lineColor: '#8ca8bd'
    });

  }

}
