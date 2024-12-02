import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingStore } from '@stores/loading.store';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  private loadingStore = inject(LoadingStore)

  isLoading$ = this.loadingStore.isLoading$
}
