import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  viewTitle = '';

  ngOnInit() {
    const { snapshot } = this.route.firstChild || {};
    if (snapshot) {
      this.viewTitle = this.getViewTitle(snapshot) ?? '';
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.route.firstChild;
        const { snapshot } = childRoute || {};
        if (snapshot) {
          this.viewTitle = this.getViewTitle(snapshot) ?? '';
        }
      });
  }

  getViewTitle(snapshot: ActivatedRouteSnapshot): string | undefined {
    return snapshot.firstChild ? this.getViewTitle(snapshot.firstChild) : snapshot.title;
  }
}
