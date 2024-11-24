import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, CreateCategory } from '../models/category.model';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient)

  createCategory(category: CreateCategory) {
    return this.http.post<Response<Category>>(environment.apiUrl + '/categories', category)
  }
}
