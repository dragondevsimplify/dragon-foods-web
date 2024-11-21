import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './my-cart.component';

const routes: Routes = [
  {
    path: '',
    component: MyCartComponent,
    title: 'My cart'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCartRoutingModule { }
