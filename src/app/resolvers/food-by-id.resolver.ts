import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Food } from "@models/food.model";
import { FoodsService } from "@services/foods.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoodByIdResolver implements Resolve<Food> {
  private foodsService = inject(FoodsService)

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const foodId = route.params['id']
    return this.foodsService.getFoodById(foodId)
  }
}
