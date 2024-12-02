import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Category } from '@models/category.model';
import { Food } from '@models/food.model';
import { FoodsService } from '@services/foods.service';
import { CategoriesStore } from '@stores/categories.store';
import { LoadingStore } from '@stores/loading.store';
import { combineLatest, tap, map } from 'rxjs';

interface ResolverData {
  categories: Category[];
  food: Food
}

@Injectable({
  providedIn: 'root'
})
export class AddOrUpdateFoodResolver implements Resolve<ResolverData> {
  private categoriesStore = inject(CategoriesStore);
  private foodsService = inject(FoodsService)
  private loadingStore = inject(LoadingStore)

  resolve(route: ActivatedRouteSnapshot) {
    this.loadingStore.setLoading(true)

    const foodId = route.params['id']
    return combineLatest([this.categoriesStore.loadCategoriesOnce$, this.foodsService.getFoodById(foodId)])
      .pipe(
        tap(() => this.loadingStore.setLoading(false)),
        map(([categories, food]) => ({
          categories,
          food,
        }))
      )
  }
}
