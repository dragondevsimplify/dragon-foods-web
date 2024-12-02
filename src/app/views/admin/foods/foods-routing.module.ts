import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AddOrUpdateFoodComponent } from './add-or-update-food/add-or-update-food.component';
import { CategoriesResolver } from 'app/resolvers/categories.resolver';
import { FoodByIdResolver } from 'app/resolvers/food-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: FoodsComponent,
  },
  {
    path: 'add',
    component: AddOrUpdateFoodComponent,
    title: 'Add food'
  },
  {
    path: 'edit/:id',
    component: AddOrUpdateFoodComponent,
    title: 'Edit food',
    resolve: {
      categories: CategoriesResolver,
      food: FoodByIdResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
