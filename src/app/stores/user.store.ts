import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../models/user';

interface State {
  userInfo: User | null
}

const initialState: State = {
  userInfo: null
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
}
