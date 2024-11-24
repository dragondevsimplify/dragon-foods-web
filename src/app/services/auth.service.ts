import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserSignin, UserSignup } from '../models/user.model';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  signin(user: UserSignin) {
    return this.http.post<Response<User>>(environment.apiUrl + '/users/signin', user)
  }

  signup(user: UserSignup) {
    return this.http.post<Response<User>>(environment.apiUrl + '/users/signup', user)
  }
}
