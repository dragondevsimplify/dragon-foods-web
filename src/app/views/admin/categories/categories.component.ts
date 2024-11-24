import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesStore } from '../../../stores/categories.store';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AddCategoryDialogComponent,
    CategoryListComponent,
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  private categoriesStore = inject(CategoriesStore);

  isShowAddDialog = false

  ngOnInit() {
    this.categoriesStore.loadCategories()
  }

  showAddCategoryDialog(isShow: boolean) {
    this.isShowAddDialog = isShow
  }
}
