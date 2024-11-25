import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AddFoodComponent } from './add-food/add-food.component';

const routes: Routes = [
  {
    path: '',
    component: FoodsComponent,
  },
  {
    path: 'add',
    component: AddFoodComponent,
    title: 'Add food'
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
