import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://route-movies-api.vercel.app/";

  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    if (localStorage.getItem('currentUser')) {

      this.savecurrentUserData();

    }
  }

  currentUserData: any = new BehaviorSubject(null);


  signUp(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "signup", data);
  }
  signIn(data:  object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "signin", data);
  }

  savecurrentUserData() {
    let encodedToken: any = localStorage.getItem('currentUser');
    // console.log(encodedToken)
    let decodedToken = jwtDecode(encodedToken);
    this.currentUserData.next(decodedToken);

  }

  isloggedin(){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    else{
      return false;
    }
  }
}
