import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Category } from '@models/category.model';
import { CategoriesStore } from '@stores/categories.store';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Category[]> {
  private categoriesStore = inject(CategoriesStore);

  resolve() {
    return this.categoriesStore.loadCategoriesOnce$
  }
}
