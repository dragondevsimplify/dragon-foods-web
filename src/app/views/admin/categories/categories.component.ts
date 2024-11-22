import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryDialogComponent } from '../../../components/add-category-dialog/add-category-dialog.component';
import { CategoryListComponent } from '../../../components/category-list/category-list.component';

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
export class CategoriesComponent {}
