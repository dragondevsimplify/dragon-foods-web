import { computed, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../models/user.model';

interface State {
  userInfo?: User
}

const initialState: State = {
  userInfo: undefined,
}

@Injectable({
  providedIn: 'root'
})
export class UserStore extends ComponentStore<State> {
  constructor() {
    super(initialState)

    this.loadUserInfo()

    this.userInfo$.subscribe(v => {
      v ? localStorage.setItem('userInfo', JSON.stringify(v)) : localStorage.removeItem('userInfo')
    })
  }

  readonly userInfo$ = this.select(state => state.userInfo)
  readonly userInfo = this.selectSignal(state => state.userInfo)
  readonly isAdmin = this.selectSignal(state => state.userInfo?.isAdmin)

  setUserInfo(userInfo: User) {
    this.patchState({ userInfo })
  }

  logout() {
    this.patchState({ userInfo: undefined })
  }

  loadUserInfo() {
    const userInfoJson = localStorage.getItem('userInfo')
    if (userInfoJson) {
      this.setUserInfo(JSON.parse(userInfoJson))
    }
  }
}
