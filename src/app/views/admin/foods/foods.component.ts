import { Component, inject, OnInit } from '@angular/core';
import { FoodsStore } from '@stores/foods.store';
import { FoodListComponent } from './food-list/food-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [FoodListComponent],
  templateUrl: './foods.component.html',
})
export class FoodsComponent implements OnInit {
  private foodsStore = inject(FoodsStore)
  private router = inject(Router)

  ngOnInit() {
    this.foodsStore.loadFoods()
  }

  redirectToAddFood() {
    this.router.navigateByUrl('/admin/foods/add')
  }
}
