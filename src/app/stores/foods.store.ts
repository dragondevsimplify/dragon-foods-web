import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Food } from '@models/food.model';
import { FoodsService } from '@services/foods.service';

interface State {
  foods: Food[];
  isLoading: boolean;
}

const initialState: State = {
  foods: [],
  isLoading: false
}

@Injectable({
  providedIn: 'root'
})
export class FoodsStore extends ComponentStore<State> {
  private foodsService = inject(FoodsService);

  readonly vm$ = this.select(state => state)

  constructor() {
    super(initialState)
  }

  readonly loadFoods = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap(() => this.foodsService.getFoods().pipe(
        tapResponse({
          next: (res) => {
            if (res.code !== 0) {
              alert(res.message)
              return
            }

            this.patchState({ foods: res.data.list })
          },
          error: (err) => {
            alert(err)
          },
          finalize: () => this.patchState({ isLoading: false }),
        })
      )),
    )
  )
}
