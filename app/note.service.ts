import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl = "https://route-movies-api.vercel.app/";

  constructor(private _HttpClient: HttpClient , private _Router:Router) { }

  getUserNote(data: any): Observable<any> {
    let options={
      headers: data
    }
    return this._HttpClient.get(this.baseUrl + "getUserNotes", options);
  }
  updateNote(data: object): Observable<any> {
    return this._HttpClient.put(this.baseUrl + "updateNote", data);
  }
  deleteNote(data: object): Observable<any> {
//come with api details from backend
    let options={
      headers:new HttpHeaders({}),
      body:data
    }
    return this._HttpClient.delete(this.baseUrl + "deleteNote", options);
  }
  addNote(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "addNote", data);
  }
}
