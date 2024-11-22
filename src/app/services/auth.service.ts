import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserSignin, UserSignup } from '../models/user.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  signin(user: UserSignin) {
    return this.http.post<Response<User>>('http://localhost:3000/users/signin', user)
  }

  signup(user: UserSignup) {
    return this.http.post<Response<User>>('http://localhost:3000/users/signup', user)
  }
}
