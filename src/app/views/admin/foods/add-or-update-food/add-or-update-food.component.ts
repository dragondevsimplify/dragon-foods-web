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
import { FoodType, FoodExtrast, CreateFood } from '../../../../models/food.model';
import { DemoCheckboxGroupComponent } from '@components/demo-checkbox-group/demo-checkbox-group.component';
import { DemoDatetimePickerComponent } from '@components/demo-datetime-picker/demo-datetime-picker.component';
import { getCurrentDateTimePicker } from '../../../../../utils/timer';
import { CategoriesStore } from '@stores/categories.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsService } from '@services/foods.service';
import { FoodsStore } from '@stores/foods.store';
import moment from 'moment';

interface RouteState {
  category?: Category;
}

type NullabelField = null | undefined

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
  private foodsStore = inject(FoodsStore)
  private foodsService = inject(FoodsService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  fg = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [<string | NullabelField>''],
    imageUrl: [<string | NullabelField>''],
    price: [<number | NullabelField>undefined, [Validators.required, Validators.min(0)]],
    tags: [<string[]>[], Validators.required],
    type: ['', Validators.required],
    extrast: [<string[]>[]],
    postDate: [getCurrentDateTimePicker(), Validators.required],
    categoryId: ['', Validators.required],
    variants: this.fb.array([]),
  });
  variantFormGroupTemplate = {
    name: ['', Validators.required],
    size: ['', Validators.required],
  }

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

  get imageUrlField() {
    return this.fg.get('imageUrl');
  }

  get variantFormGroups() {
    return (this.fg.get('variants') as FormArray).controls as FormGroup[];
  }

  ngOnInit() {
    this.categoriesStore.loadCategories();

    this.fg.valueChanges.subscribe((change) => {
      this.watchImageUrlChange(change.imageUrl);
    });

    const routeState = this.location.getState() as RouteState;

    this.category = routeState?.category;
    if (this.category) {
      this.fg.patchValue({
        categoryId: this.category.id,
      });
    }

    this.loadFood()
  }

  private loadFood() {
    const { id } = this.route.snapshot.params
    if (id) {
      this.foodsService.getFoodById(id).subscribe(res => {
        if (res.code !== 0 || !res.data) {
          alert(res.message)
          return
        }

        console.log(res.data)
        // const postDate = res.data.postDate.toISOString().slice(0, 16)
        const postDate = moment(res.data.postDate).toISOString(true).slice(0, 16)

        this.fg.patchValue({
          ...res.data,
          postDate,
        })
      })
    }
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

  createFood() {
    const data = this.fg.value

    this.foodsService.createFood({
      ...data,
      postDate: data.postDate ? new Date(data.postDate) : undefined
    } as CreateFood)
      .subscribe(res => {
        if (res.code !== 0) {
          alert(res.message)
          return
        }

        this.foodsStore.loadFoods()
        this.router.navigateByUrl('/admin/foods')
      })
  }

  formSubmit() {
    if (this.fg.invalid) {
      return;
    }

    this.createFood();
  }

  switchUseUrl(e: Event) {
    const checkbox = e.target as HTMLInputElement;

    if (checkbox) {
      this.isUploadFromUrl = checkbox.checked;
    }

    this.imageUrlField?.reset();
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
    this.router.navigateByUrl('/admin/foods')
  }

  addVariant() {
    (this.fg.get('variants') as FormArray).push(this.fb.group({
      ...this.variantFormGroupTemplate,
    }));
  }
}
