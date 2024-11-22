import { Component } from '@angular/core';
import { CategoryItemComponent } from '../category-item/category-item.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryItemComponent],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {

}
