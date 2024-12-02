import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateFood, Food, UpdateFood } from '@models/food.model';
import { DataResponse, Response, ResponseList } from '@models/response.model';
import {
  Observable,
  of,
  switchMap,
  tap,
  map,
  from,
  mergeMap,
  toArray,
  concatMap,
  catchError,
} from 'rxjs';
import { CategoriesService } from './categories.service';
import { Category } from '@models/category.model';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private http = inject(HttpClient);
  private categoriesService = inject(CategoriesService);

  foods: Food[] = [
    {
      id: 'FOOD1',
      name: 'Coca Cola 1',
      description: 'Description Coca Cola 1',
      imageUrl:
        'http://localhost:3000/uploads/ae1e227c-abd4-4037-8500-9702496b4b9c.jpg',
      price: 12000,
      tags: ['special_food', 'most_favorite'],
      type: 'drink',
      extrast: ['toping_1', 'toping_2'],
      postDate: new Date('2024-11-27T01:28'),
      categoryId: '6742a0e0ab7ce85a927b9182',
      variants: [
        {
          name: 'CRed',
          size: 'md',
        },
        {
          name: 'CBlue',
          size: 'md',
        },
      ],
      category: {
        id: '6742a0e0ab7ce85a927b9182',
        name: 'Coca cola',
        imageUrl:
          'http://localhost:3000/uploads/27c8c9b2-0377-494c-86b1-988c205fbfc6.jpg',
      },
    },
    {
      id: 'FOOD2',
      name: 'Coca Cola 2',
      description: 'Description Coca Cola 2',
      imageUrl:
        'http://localhost:3000/uploads/4197f99f-9187-4d4c-9164-67028b99c604.jpg',
      price: 320000,
      tags: ['most_favorite'],
      type: 'drink',
      extrast: [],
      postDate: new Date('2024-11-29T19:12'),
      categoryId: '6742a0e0ab7ce85a927b9182',
      variants: [
        {
          name: 'CYellow',
          size: 'lg',
        },
      ],
      category: {
        id: '6742a0e0ab7ce85a927b9182',
        name: 'Coca cola',
        imageUrl:
          'http://localhost:3000/uploads/27c8c9b2-0377-494c-86b1-988c205fbfc6.jpg',
      },
    },
    {
      id: 'FOOD3',
      name: 'Chicken ABC',
      description: 'Description Chicken ABC',
      imageUrl:
        'http://localhost:3000/uploads/b34846a5-ed2e-423c-a2f8-d488ae8cbc2c.jpg',
      price: 200,
      tags: ['new_food', 'special_food', 'most_favorite'],
      type: 'food',
      extrast: ['toping_1', 'toping_2', 'toping_3'],
      postDate: new Date('2024-10-22T04:55'),
      categoryId: '6742d1bdab7ce85a927b9184',
      variants: [
        {
          name: 'Child Combo',
          size: 'sm',
        },
        {
          name: 'Medium Combo',
          size: 'md',
        },
        {
          name: 'Large Combo',
          size: 'lg',
        },
      ],
      category: {
        id: '6742d1bdab7ce85a927b9184',
        name: 'KFC',
        imageUrl:
          'http://localhost:3000/uploads/ff7b1dca-5e93-4236-b54d-0681e871b4ff.jpg',
      },
    },
  ];

  get newFoodId() {
    const prefix = 'FOOD';
    const ids = this.foods.map((i) => i.id).sort();

    if (!ids) {
      return prefix + 1;
    }

    const idNumber = this.extractNumber(ids.at(-1)!);
    return prefix + (idNumber + 1);
  }

  private extractNumber(idStr: string) {
    const s = idStr.match(/\d+$/);
    return s ? +s[0] : NaN;
  }

  createFood(model: CreateFood) {
    return this.http.post<Food>('https://localhost:7098/foods', model);
    // return of<Response<Food>>({
    //   code: 0,
    //   data: {
    //     ...structuredClone(model),
    //     id: this.newFoodId,
    //   },
    //   message: 'Create food successfully',
    // }).pipe(
    //   tap(({ data: newFood }) => {
    //     if (newFood) {
    //       this.foods.push(newFood);
    //     }
    //   })
    // );
  }

  updateFood(model: UpdateFood) {
    return this.http.put<Food>(`https://localhost:7098/foods/${model.id}`, model);
    // return of<Response<Food>>({
    //   code: 0,
    //   data: structuredClone(model),
    //   message: 'Update food successfully',
    // }).pipe(
    //   tap(({ data }) => {
    //     if (!data) {
    //       return;
    //     }

    //     const existingFood = this.foods.find((i) => i.id === data.id);
    //     if (existingFood) {
    //       Object.assign(existingFood, data);
    //     }
    //   })
    // );
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
        concatMap(res => from(res.list).pipe(
          mergeMap(food => this.mapCategory(food.categoryId).pipe(
            map(category => ({
              ...food,
              category
            }))
          )),
          toArray()
        )),
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
    // return from(this.foods).pipe(
    //   mergeMap((food) =>
    //     this.mapCategory(food.categoryId).pipe(
    //       map((category) => ({
    //         ...food,
    //         category,
    //       }))
    //     )
    //   ),
    //   toArray(),
    //   map((foods) => ({
    //     code: 0,
    //     data: {
    //       list: foods,
    //       totalPages: 1,
    //       totalItems: 3,
    //       pageSize: 10,
    //       pageNumber: 1,
    //     },
    //     message: 'Get foods successfully',
    //   }))
    // );
  }

  getFoodById(id: string): Observable<Food> {
    return this.http
      .get<Food>(`https://localhost:7098/foods/${id}`)
      .pipe(
        concatMap(food => {
          const { categoryId } = food
          if (!categoryId) {
            return of(food)
          }

          return this.mapCategory(categoryId)
            .pipe(
              map(category => ({
                ...food,
                category,
              }))
            )
        })
      )
    // const food = this.foods.find((i) => i.id === id);

    // const res = food
    //   ? {
    //       code: 0,
    //       data: {
    //         ...food,
    //       },
    //       message: 'Get food successfully',
    //     }
    //   : {
    //       code: 1,
    //       data: null,
    //       message: 'Not found',
    //     };

    // return of(res).pipe(
    //   switchMap((res) => {
    //     if (!res.data) {
    //       return of(res);
    //     }

    //     const { categoryId } = res.data;

    //     if (categoryId) {
    //       return this.mapCategory(categoryId).pipe(
    //         map((category) => ({
    //           ...res,
    //           data: {
    //             ...res.data,
    //             category,
    //           },
    //         }))
    //       );
    //     }

    //     return of({
    //       ...res,
    //       data: {
    //         ...res.data,
    //         category: undefined,
    //       },
    //     });
    //   })
    // );
  }

  mapCategory(categoryId: string): Observable<Category | null> {
    return this.categoriesService
      .getCategoryById(categoryId)
      .pipe(map((res) => res.data));
  }
}
