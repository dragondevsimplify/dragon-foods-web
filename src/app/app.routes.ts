import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./views/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./views/auth/register/register.module').then(m => m.RegisterModule)
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./views/admin/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'foods',
        loadChildren: () => import('./views/admin/foods/foods.module').then(m => m.FoodsModule)
      },
      {
        path: 'my-cart',
        loadChildren: () => import('./views/admin/my-cart/my-cart.module').then(m => m.MyCartModule)
      },
    ]
  }
];
