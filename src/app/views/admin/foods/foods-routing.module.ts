import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { AddOrUpdateFoodComponent } from './add-or-update-food/add-or-update-food.component';
import { AddOrUpdateFoodResolver } from 'app/resolvers/add-or-update-food.resolver';

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
      data: AddOrUpdateFoodResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
