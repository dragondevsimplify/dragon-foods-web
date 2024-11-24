import { Component, inject } from '@angular/core';
import { CategoryItemComponent } from '../category-item/category-item.component';
import { CategoriesStore } from '../../stores/categories.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryItemComponent],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  private categoriesStore = inject(CategoriesStore);
  vm$ = this.categoriesStore.vm$
}
