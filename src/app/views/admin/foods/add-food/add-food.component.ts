import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [],
  templateUrl: './add-food.component.html',
})
export class AddFoodComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // this.route.
  }
}
