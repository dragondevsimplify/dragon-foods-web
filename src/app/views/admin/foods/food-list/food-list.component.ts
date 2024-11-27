import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItemComponent } from '../food-item/food-item.component';
import { FoodsStore } from '@stores/foods.store';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FoodItemComponent],
  templateUrl: './food-list.component.html',
})
export class FoodListComponent {
  private foodsStore = inject(FoodsStore);
  vm$ = this.foodsStore.vm$
}
