import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Category } from '../../../../models/category.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../validators/url.validator';
import { FileUploaded } from '../../../../models/media.model';
import { UploadFileComponent } from '../../../../components/upload-file/upload-file.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { DemoMceComponent } from '../../../../components/demo-mce/demo-mce.component';
import { DemoSelectComponent } from "../../../../components/demo-select/demo-select.component";
import { Tag } from '../../../../models/tag.model';
import { DemoRadioComponent } from "../../../../components/demo-radio/demo-radio.component";
import { FoodType, FoodExtrast } from '../../../../models/food.model';
import { DemoCheckboxGroupComponent } from "../../../../components/demo-checkbox-group/demo-checkbox-group.component";

interface RouteState {
  category?: Category;
}

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadFileComponent,
    errorTailorImports,
    DemoMceComponent,
    DemoSelectComponent,
    DemoRadioComponent,
    DemoCheckboxGroupComponent
],
  templateUrl: './add-food.component.html',
})
export class AddFoodComponent implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  fg = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
    price: [undefined, [Validators.required, Validators.min(0)]],
    tags: [[], Validators.required],
    type: [undefined, Validators.required],
    extrast: [[]],
    postDate: [Date.now(), Validators.required]
  });

  category?: Category;
  isUploadFromUrl = false;
  isShowSaveWithoutImage = false;
  tagOptions: Tag[] = [
    {
      value: 'new_food',
      label: 'New food'
    },
    {
      value: 'special_food',
      label: 'Special food'
    },
    {
      value: 'most_favorite',
      label: 'Most favorite'
    }
  ]
  typeOptions: FoodType[] = [
    {
      value: 'food',
      label: 'Food'
    },
    {
      value: 'drink',
      label: 'Drink'
    }
  ]
  extrastOptions: FoodExtrast[] = [
    {
      value: 'toping_1',
      label: 'Toping 1'
    },
    {
      value: 'toping_2',
      label: 'Toping 2'
    },
    {
      value: 'toping_3',
      label: 'Toping 3'
    },
  ]

  get imageUrlField() {
    return this.fg.get('imageUrl');
  }

  ngOnInit() {
    const routeState = this.location.getState() as RouteState;
    this.category = routeState?.category;
    this.fg.valueChanges.subscribe((change) => {
      this.watchImageUrlChange(change.imageUrl);
    });
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
    // this.categoriesService.createCategory(this.fg.value as CreateCategory)
    //   .subscribe(res => {
    //     if (res.code !== 0) {
    //       alert(res.message)
    //       return
    //     }
    //     this.categoriesStore.loadCategories()
    //     this.close()
    //   })
  }

  formSubmit() {
    console.log(this.fg)
    // this.fg.markAllAsTouched();

    // if (this.fg.invalid) {
    //   return;
    // }

    // if (!this.fg.value.imageUrl) {
    //   this.isShowSaveWithoutImage = true;
    //   return;
    // }

    // this.createFood();
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

  back() {}
}
