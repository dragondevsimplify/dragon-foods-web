import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateFood, Food } from '@models/food.model';
import { Response, ResponseList } from '@models/response.model';
import { environment } from 'environments/environment.development';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private http = inject(HttpClient);
  foods: Food[] = [
    {
      id: uuidv4(),
      name: 'Coca Cola 1',
      description: 'Description Coca Cola 1',
      imageUrl:
        'http://localhost:3000/uploads/ae1e227c-abd4-4037-8500-9702496b4b9c.jpg',
      price: 12,
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
    },
    {
      id: uuidv4(),
      name: 'Coca Cola 2',
      description: 'Description Coca Cola 2',
      imageUrl:
        "http://localhost:3000/uploads/4197f99f-9187-4d4c-9164-67028b99c604.jpg",
      price: 32,
      tags: ['most_favorite'],
      type: 'drink',
      extrast: [],
      postDate: new Date('2024-11-29T01:28'),
      categoryId: '6742a0e0ab7ce85a927b9182',
      variants: [
        {
          name: 'CYellow',
          size: 'lg',
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'Chicken ABC',
      description: 'Description Chicken ABC',
      imageUrl:
        "http://localhost:3000/uploads/b34846a5-ed2e-423c-a2f8-d488ae8cbc2c.jpg",
      price: 32,
      tags: ['new_food', 'special_food', 'most_favorite'],
      type: 'food',
      extrast: ['toping_1', 'toping_2', 'toping_3'],
      postDate: new Date('2024-11-29T01:28'),
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
    },
  ];

  createFood(model: CreateFood) {
    return this.http.post<Response<Food>>(environment.apiUrl + '/foods', model);
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

  getFoodById(id: string) {}
}
