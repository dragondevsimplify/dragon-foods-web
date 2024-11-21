import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private userStore = inject(UserStore);
  private router  = inject(Router);

  logout() {
    this.userStore.logout();
    this.router.navigate(['/auth/login']);
  }
}
