import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Food } from '@models/food.model';
import { VndCurrencyPipe } from 'app/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [RouterLink, DatePipe, VndCurrencyPipe],
  templateUrl: './food-item.component.html',
})
export class FoodItemComponent {
  @Input({ required: true }) data!: Food
}
