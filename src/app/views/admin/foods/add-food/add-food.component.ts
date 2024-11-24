import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../models/category.model';

interface RouteState {
  category?: Category;
}

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [],
  templateUrl: './add-food.component.html',
})
export class AddFoodComponent implements OnInit {
  private location = inject(Location);
  // private route = inject(ActivatedRoute);

  category?: Category;

  ngOnInit() {
    const routeState = this.location.getState() as RouteState
    this.category = routeState?.category

    // Resolver
    // this.route.data.subscribe(({ category }) => {
    //   console.log(category)
    //   this.category = category;
    // });
  }
}
