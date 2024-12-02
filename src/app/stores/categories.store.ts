import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';
import { delay, exhaustMap, map, of, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface State {
  categories: Category[];
  isLoading: boolean;
}

const initialState: State = {
  categories: [],
  isLoading: false,
};

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore extends ComponentStore<State> {
  private categoriesService = inject(CategoriesService);

  readonly vm$ = this.select((state) => state);
  readonly categoryOptions$ = this.select((state) =>
    state.categories.map((i) => ({
      value: i.id,
      label: i.name,
    }))
  );

  constructor() {
    super(initialState);
  }

  readonly loadCategories = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap(() =>
        this.categoriesService.getCategories().pipe(
          tapResponse({
            next: (res) => {
              if (res.code !== 0) {
                alert(res.message);
                return;
              }

              this.patchState({ categories: res.data.list });
            },
            error: (err) => {
              alert(err);
            },
            finalize: () => this.patchState({ isLoading: false }),
          })
        )
      )
    )
  );

  readonly loadCategoriesOnce$ = this.select((state) => state.categories).pipe(
    delay(3000),
    exhaustMap((categories) => {
      if (categories.length > 0) {
        return of(categories);
      }

      return this.categoriesService.getCategories().pipe(
        tapResponse({
          next: (res) => {
            if (res.code !== 0) {
              alert(res.message);
              return;
            }

            this.patchState({ categories: res.data.list });
          },
          error: (err) => {
            alert(err);
          },
        }),
        map(res => res.data.list)
      );
    })
  );
}
