import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; //forms4
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any;



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  isSuccess = false;
  responseMessage = "";
  isFaild = false;

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  signUpForm:FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^(?=.{3,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^(?=.{3,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(5), Validators.max(80)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]) //Minimum eight characters, at least one letter and one number:
  });

  checked:boolean=true;

  signUp(signUpForm: FormGroup) {

    this.isFaild = false;
    this.isSuccess = false;

    console.log(signUpForm);

    this.checked=false; //waiting .........

    if (signUpForm.valid) {

      this._AuthService.signUp(signUpForm.value).subscribe(response => {
        // console.log(response);
        if (response.message == "success") {
          this.checked=true; // back to signup
          this.isSuccess = true;
          $("#goto").show(1000);
          this.signUpForm.reset();
          // this._Router.navigate(['/signIn']);
          
        }
        else {
          this.checked=true;// back to signup
          this.isFaild = true;
          this.responseMessage = response.errors.email.message;
        }
        setInterval(() => {
          this.isFaild = false;
          this.isSuccess = false;
        }, 5000);
      })
    }
  }


  //   اى حاجة تخص الجى كويرى بكتبها جوا ال ngoninit()
  ngOnInit(): void {


    $('#signUp').particleground({
      dotColor: ' rgb(228, 133, 74)',
      lineColor: '#8ca8bd ',    
    });


  }
}
