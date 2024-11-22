import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../../validators/url.validator';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  fb = inject(FormBuilder)
  fg = this.fb.group({
    name: ['', Validators.required],
    imageUrl: ['', CustomValidator.urlValidator]
  })

  get nameField() {
    return this.fg.get('name')
  }

  get imageUrlField() {
    return this.fg.get('imageUrl')
  }

  createCategory() {
    console.log(this.fg.value)
  }
}
