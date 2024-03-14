import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  userToken: BehaviorSubject<any> = new BehaviorSubject(null);

  signUp(userinfo: User): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signUp`, userinfo);
  }

  signin(userinfo: User): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signIn`, userinfo);
  }

  setUserToken(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userToken.next(localStorage.getItem('userToken'));
      // this.userToken.next(jwtDecode(this.userToken.getValue()));
    } else {
      this.userToken.next(null);
    }
  }
}
