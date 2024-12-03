import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, inject, Injectable } from '@angular/core';
import { CreateFood, Food, UpdateFood } from '@models/food.model';
import { DataResponse } from '@models/response.model';
import { Observable, of, map, from, mergeMap, toArray, concatMap } from 'rxjs';
import { CategoriesService } from './categories.service';
import { Category } from '@models/category.model';
import { tapResponse } from '@ngrx/operators';
import { FoodsStore } from '@stores/foods.store';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private http = inject(HttpClient);
  private categoriesService = inject(CategoriesService);

  createFood(model: CreateFood) {
    return this.http.post<Food>('https://localhost:7098/foods', model);
  }

  updateFood(model: UpdateFood) {
    return this.http.put<Food>(
      `https://localhost:7098/foods/${model.id}`,
      model
    );
  }

  getFoods() {
    return this.http
      .get<DataResponse<Food>>('https://localhost:7098/foods', {
        params: {
          getAll: true,
          page: 0,
          pageSize: 0,
        },
      })
      .pipe(
        concatMap((res) =>
          from(res.list).pipe(
            mergeMap((food) =>
              this.mapCategory(food.categoryId).pipe(
                map((category) => ({
                  ...food,
                  category,
                }))
              )
            ),
            toArray()
          )
        ),
        map((foods) => ({
          code: 0,
          data: {
            list: foods,
            totalPages: 1,
            totalItems: 3,
            pageSize: 10,
            pageNumber: 1,
          },
          message: 'Get foods successfully',
        }))
      );
  }

  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(`https://localhost:7098/foods/${id}`).pipe(
      concatMap((food) => {
        const { categoryId } = food;
        if (!categoryId) {
          return of(food);
        }

        return this.mapCategory(categoryId).pipe(
          map((category) => ({
            ...food,
            category,
          }))
        );
      })
    );
  }

  deleteFood(id: number) {
    return this.http.delete(`https://localhost:7098/foods/${id}`);
  }

  mapCategory(categoryId: string): Observable<Category | null> {
    return this.categoriesService
      .getCategoryById(categoryId)
      .pipe(map((res) => res.data));
  }
}
