import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../models/user';

interface State {
  userInfo?: User
}

const initialState: State = {
  userInfo: undefined
}

@Injectable({
  providedIn: 'root'
})
export class UserStore extends ComponentStore<State> {
  constructor() {
    super(initialState)
  }

  readonly userInfo$ = this.select(state => state.userInfo)

  setUserInfo(userInfo: User) {
    this.patchState({ userInfo })
  }

  logout() {
    this.patchState({ userInfo: undefined })
  }
}
