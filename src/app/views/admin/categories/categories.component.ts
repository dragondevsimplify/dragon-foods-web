import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {}
