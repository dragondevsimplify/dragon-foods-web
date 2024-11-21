import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';

const routes: Routes = [
  {
    path: '',
    component: FoodsComponent,
    title: 'Foods'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
