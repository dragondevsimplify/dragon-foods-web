import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class AddFoodResolver implements Resolve<any> {
  private categoriesService = inject(CategoriesService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return 'abc'
  }
}
