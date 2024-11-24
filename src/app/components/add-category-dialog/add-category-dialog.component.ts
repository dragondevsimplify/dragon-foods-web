import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../validators/url.validator';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UploadFileComponent } from "../upload-file/upload-file.component";
import { FileUploaded } from '../../models/media.model';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialogComponent, UploadFileComponent],
  templateUrl: './add-category-dialog.component.html',
})
export class AddCategoryDialogComponent implements OnInit {
  fb = inject(FormBuilder);

  fg = this.fb.group({
    name: ['', Validators.required],
    imageUrl: [''],
  });

  isUploadFromUrl = false;
  isShowSaveWithoutImage = false;

  @Input({ required: true }) isShow = false;
  @Output() isShowChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.fg.valueChanges.subscribe(change => {
      this.watchImageUrlChange(change.imageUrl)
    })
  }

  get nameField() {
    return this.fg.get('name');
  }

  get imageUrlField() {
    return this.fg.get('imageUrl');
  }

  private watchImageUrlChange(newImageUrl: string | null | undefined) {
    return newImageUrl ? this.addImageUrlFieldValidators() : this.removeImageUrlFieldValidators()
  }

  private addImageUrlFieldValidators() {
    const field = this.fg.get('imageUrl')

    if (!field) {
      return
    }

    field.addValidators([CustomValidator.urlValidator])
    field.updateValueAndValidity({
      emitEvent: false,
    })
  }

  private removeImageUrlFieldValidators() {
    const field = this.fg.get('imageUrl')

    if (!field) {
      return
    }

    field.removeValidators(CustomValidator.urlValidator)
    field.updateValueAndValidity({
      emitEvent: false,
    })
  }

  createCategory() {
    this.fg.markAllAsTouched();

    if (this.fg.invalid) {
      return;
    }

    console.log(this.fg.value);
    if (!this.fg.value.imageUrl) {
      this.isShowSaveWithoutImage = true;
    }
  }

  close() {
    this.isShowChange.emit(false);
    this.fg.reset()
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
      imageUrl: fileUploaded.url
    })
  }

  fileCleared() {
    this.fg.patchValue({
      imageUrl: ''
    })
  }

  saveWithoutImage() {

  }

  cancelSaveWithoutImage() {
    this.isShowSaveWithoutImage = false;
  }
}
