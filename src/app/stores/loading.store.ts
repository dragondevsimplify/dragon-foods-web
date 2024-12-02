import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
}

@Injectable({
  providedIn: 'root'
})
export class LoadingStore extends ComponentStore<State> {
  readonly vm$ = this.select(state => state)
  readonly isLoading$ = this.select(state => state.isLoading)

  constructor() {
    super(initialState)
  }

  setLoading(isLoading: boolean) {
    this.patchState({
      isLoading,
    })
  }
}
