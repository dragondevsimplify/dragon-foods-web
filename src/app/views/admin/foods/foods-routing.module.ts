import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddFoodResolver } from '../../../resolvers/add-food.resolver';

const routes: Routes = [
  {
    path: '',
    component: FoodsComponent,
  },
  {
    path: 'add',
    component: AddFoodComponent,
    // resolve: {
    //   addFood: AddFoodResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
