import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateFood, Food } from '@models/food.model';
import { Response, ResponseList } from '@models/response.model';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private http = inject(HttpClient);
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
    const prefix = 'FOOD'
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
    // return this.http.post<Response<Food>>(environment.apiUrl + '/foods', model);
    return of<Response<Food>>({
      code: 0,
      data: {
        ...model,
        id: this.newFoodId,
      },
      message: 'Get food successfully',
    }).pipe(
      tap(({ data: newFood }) => {
        this.foods.push(newFood)
      })
    );
  }

  getFoods() {
    // return this.http.get<ResponseList<Food>>(environment.apiUrl + '/foods');
    return of<ResponseList<Food>>({
      code: 0,
      data: {
        list: structuredClone(this.foods),
        totalPages: 1,
        totalItems: 3,
        pageSize: 10,
        pageNumber: 1,
      },
      message: 'Get food successfully',
    });
  }

  getFoodById(id: string) {
    const food = this.foods.find((i) => i.id === id);

    const res = food
      ? {
          code: 0,
          data: food,
          message: 'Get food successfully',
        }
      : {
          code: 1,
          data: null,
          message: 'Not found',
        };

    return of(res);
  }
}
