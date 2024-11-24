import { inject, Injectable } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  private userStore = inject(UserStore);

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.userStore.isAdmin)
    return !!this.userStore.isAdmin
  }
}
