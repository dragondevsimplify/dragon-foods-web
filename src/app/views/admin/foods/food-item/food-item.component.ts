import { Component, inject, Input } from '@angular/core';
import { Food } from '@models/food.model';

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [],
  templateUrl: './food-item.component.html',
})
export class FoodItemComponent {
  @Input({ required: true }) data!: Food
}
