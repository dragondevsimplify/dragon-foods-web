import { Component, inject, Input } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [],
  templateUrl: './category-item.component.html',
})
export class CategoryItemComponent {
  private router = inject(Router)

  @Input({ required: true }) data!: Category

  redirectToAddFood() {
    this.router.navigate(['/admin/foods/add'], {
      state: {
        category: 'hello',
      }
    });
  }
}
