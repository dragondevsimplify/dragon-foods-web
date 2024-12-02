import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Category } from '../../../../models/category.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidator } from '../../../../validators/url.validator';
import { FileUploaded } from '../../../../models/media.model';
import { UploadFileComponent } from '@components/upload-file/upload-file.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { DemoMceComponent } from '@components/demo-mce/demo-mce.component';
import { DemoSelectComponent } from '@components/demo-select/demo-select.component';
import { Tag } from '../../../../models/tag.model';
import { DemoRadioComponent } from '@components/demo-radio/demo-radio.component';
import {
  FoodType,
  FoodExtrast,
  CreateFood,
  Food,
  UpdateFood,
} from '../../../../models/food.model';
import { DemoCheckboxGroupComponent } from '@components/demo-checkbox-group/demo-checkbox-group.component';
import { DemoDatetimePickerComponent } from '@components/demo-datetime-picker/demo-datetime-picker.component';
import { getCurrentDateTimePicker } from '../../../../../utils/timer';
import { CategoriesStore } from '@stores/categories.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsService } from '@services/foods.service';
import { FoodsStore } from '@stores/foods.store';
import moment from 'moment';
import * as _ from 'lodash';

interface RouteState {
  category?: Category;
}

type NullabelField = null | undefined;

@Component({
  selector: 'app-add-or-update-food',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadFileComponent,
    errorTailorImports,
    DemoMceComponent,
    DemoSelectComponent,
    DemoRadioComponent,
    DemoCheckboxGroupComponent,
    DemoDatetimePickerComponent,
  ],
  templateUrl: './add-or-update-food.component.html',
})
export class AddOrUpdateFoodComponent implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private categoriesStore = inject(CategoriesStore);
  private foodsStore = inject(FoodsStore);
  private foodsService = inject(FoodsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private _currentFood?: Food;
  private _originalFormData?: unknown;
  private _detectFormValueChanged: boolean = false;

  fg = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [<string | NullabelField>''],
    imageUrl: [<string | NullabelField>''],
    price: [
      <number | NullabelField>undefined,
      [Validators.required, Validators.min(0)],
    ],
    tags: [<string[]>[], Validators.required],
    type: ['', Validators.required],
    extrast: [<string[]>[]],
    postDate: [getCurrentDateTimePicker(), Validators.required],
    categoryId: ['', Validators.required],
    variants: this.fb.array([]),
  });

  category?: Category;
  isUploadFromUrl = false;
  isShowSaveWithoutImage = false;
  categoryOptions$ = this.categoriesStore.categoryOptions$;
  tagOptions: Tag[] = [
    {
      value: 'new_food',
      label: 'New food',
    },
    {
      value: 'special_food',
      label: 'Special food',
    },
    {
      value: 'most_favorite',
      label: 'Most favorite',
    },
  ];
  typeOptions: FoodType[] = [
    {
      value: 'food',
      label: 'Food',
    },
    {
      value: 'drink',
      label: 'Drink',
    },
  ];
  extrastOptions: FoodExtrast[] = [
    {
      value: 'toping_1',
      label: 'Toping 1',
    },
    {
      value: 'toping_2',
      label: 'Toping 2',
    },
    {
      value: 'toping_3',
      label: 'Toping 3',
    },
  ];

  get currentFood() {
    return this._currentFood;
  }

  get imageUrlField() {
    return this.fg.get('imageUrl');
  }

  get variantFormGroups() {
    return (this.fg.get('variants') as FormArray).controls as FormGroup[];
  }

  get detectFormValueChanged() {
    if (this._currentFood) {
      return this._detectFormValueChanged;
    }
    return true
  }

  ngOnInit() {
    this.fg.valueChanges.subscribe((change) => {
      this.detectFormValueChangedFunc(change);
      this.watchImageUrlChange(change.imageUrl);
    });

    const routeState = this.location.getState() as RouteState;
    this.category = routeState?.category;
    if (this.category) {
      this.fg.patchValue({
        categoryId: this.category.id,
      });
    }

    this.route.data.subscribe({
      next: ({ food }) => {
        this.fg.patchValue({
          ...food,
          postDate: moment(food.postDate).toISOString(true).slice(0, 16),
        });

        food.variants.forEach((variantForm: any) => {
          this.addVariant({
            name: variantForm.name,
            size: variantForm.size,
          });
        });

        this._currentFood = food;
        this._originalFormData = structuredClone(this.fg.value);
      },
      error: (err) => {
        alert(err)
      }
    })
  }

  private detectFormValueChangedFunc(change: unknown) {
    if (!this._originalFormData) {
      return;
    }

    this._detectFormValueChanged = !_.isEqual(change, this._originalFormData);
  }

  private watchImageUrlChange(newImageUrl: string | null | undefined) {
    return newImageUrl
      ? this.addImageUrlFieldValidators()
      : this.removeImageUrlFieldValidators();
  }

  private addImageUrlFieldValidators() {
    const field = this.fg.get('imageUrl');

    if (!field) {
      return;
    }

    field.addValidators([CustomValidator.urlValidator]);
    field.updateValueAndValidity({
      emitEvent: false,
    });
  }

  private removeImageUrlFieldValidators() {
    const field = this.fg.get('imageUrl');

    if (!field) {
      return;
    }

    field.removeValidators(CustomValidator.urlValidator);
    field.updateValueAndValidity({
      emitEvent: false,
    });
  }

  createOrUpdateFood() {
    const formValue = this.fg.value;
    const data = {
      ...formValue,
      postDate: formValue.postDate ? new Date(formValue.postDate) : undefined,
      id: this._currentFood?.id
    };

    if (this._currentFood) {
      this.foodsService.updateFood(data as UpdateFood).subscribe({
        next: () => {
          this.foodsStore.loadFoods();
          alert('Update food successfully')
        },
        error: (err) => {
          alert(err)
        }
      });
    } else {
      this.foodsService.createFood(data as CreateFood).subscribe({
        next: (foodRes) => {
          this.foodsStore.loadFoods();
          this.router.navigateByUrl('/admin/foods');
          alert('Create food successfully')
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }

  formSubmit() {
    if (this.fg.invalid) {
      return;
    }

    this.createOrUpdateFood();
  }

  switchUseUrl(e: Event) {
    const checkbox = e.target as HTMLInputElement;

    if (checkbox) {
      this.isUploadFromUrl = checkbox.checked;
    }
  }

  fileUploaded(fileUploaded: FileUploaded) {
    if (!fileUploaded.url) {
      alert('Upload image failed');
      return;
    }

    this.fg.patchValue({
      imageUrl: fileUploaded.url,
    });
  }

  fileCleared() {
    this.fg.patchValue({
      imageUrl: '',
    });
  }

  cancelSaveWithoutImage() {
    this.isShowSaveWithoutImage = false;
  }

  back() {
    this.router.navigateByUrl('/admin/foods');
  }

  addVariant(
    {
      name,
      size,
    }: {
      name: string;
      size: string;
    } = {
      name: '',
      size: '',
    }
  ) {
    (this.fg.get('variants') as FormArray).push(
      this.fb.group({
        name: [name, Validators.required],
        size: [size, Validators.required],
      })
    );
  }

  removeImage() {
    this.fg.patchValue({
      imageUrl: undefined,
    });
  }
}
