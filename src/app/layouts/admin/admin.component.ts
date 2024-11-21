import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute, NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  viewTitle = ''

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Chỉ xử lý sự kiện NavigationEnd
    ).subscribe(() => {
      const childRoute = this.route.firstChild;
      if (childRoute) {
        this.viewTitle = childRoute.snapshot.title ?? '';
      }
    });
  }
}
