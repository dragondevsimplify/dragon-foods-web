import { inject, Injectable } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  private userStore = inject(UserStore);
  private router = inject(Router);

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !!this.userStore.isAdmin() ? true : this.router.navigateByUrl('home');
  }
}
