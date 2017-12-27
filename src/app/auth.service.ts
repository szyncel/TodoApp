import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  get currentUser(){
    let token=localStorage.getItem('token');
    if(!token)return null;

    let jwtHelper=new JwtHelper();
    return jwtHelper.decodeToken(token);
  }

  signup(user: User) {
    //const body= JSON.stringify(user);
    return this.http.post('/api/users', user)
  }

  signin(user: User): Observable<any> {
    return this.http.post('/api/users/login', user, { observe: 'response' })
      .map(response => {
        let res: any = response.body;
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          return true;
        }
        return false;
      })
  }

  logout() {
    // console.log('klik');
    // let token = localStorage.getItem('token');
    // console.log(token);
    // this.http.delete(`/api/users/me/token`)
    //   .map(response => console.log(response))
    localStorage.removeItem('token');

  }

  isLoggedIn() {
    return tokenNotExpired();
  }

}
