import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Food } from '@models/food.model';
import { tapResponse } from '@ngrx/operators';
import { FoodsService } from '@services/foods.service';
import { FoodsStore } from '@stores/foods.store';
import { VndCurrencyPipe } from 'app/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-food-item',
  standalone: true,
  imports: [RouterLink, DatePipe, VndCurrencyPipe],
  templateUrl: './food-item.component.html',
})
export class FoodItemComponent {
  private foodsService = inject(FoodsService)
  private foodsStore = inject(FoodsStore)

  @Input({ required: true }) data!: Food

  deleteFood() {
    const deleteConfirm = window.confirm('Are you sure delete this food?')
    if (deleteConfirm) {
      this.foodsService.deleteFood(this.data.id).pipe(
        tapResponse({
          next: (v) => {
            this.foodsStore.loadFoods();
          },
          error: (err) => {},
        })
      ).subscribe()
    }
  }
}
