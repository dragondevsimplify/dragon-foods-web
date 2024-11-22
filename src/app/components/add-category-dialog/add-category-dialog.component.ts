import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../validators/url.validator';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category-dialog.component.html',
})
export class AddCategoryDialogComponent {
  fb = inject(FormBuilder)
  mediaService = inject(MediaService)

  fg = this.fb.group({
    name: ['', Validators.required],
    imageUrl: ['', CustomValidator.urlValidator]
  })

  isUploadFromUrl = false

  @Input({ required: true }) isShow = false
  @Output() isShowChange = new EventEmitter<boolean>()

  get nameField() {
    return this.fg.get('name')
  }

  get imageUrlField() {
    return this.fg.get('imageUrl')
  }

  createCategory() {
    console.log(this.fg.value)
  }

  close() {
    this.isShowChange.emit(false)
  }

  switchUseUrl(e: Event) {
    const checkbox = e.target as HTMLInputElement
    if (checkbox) {
      this.isUploadFromUrl = checkbox.checked
    }
    this.imageUrlField?.reset()
  }

  uploadImageFile(e: Event) {
    const fileInput = e.target as HTMLInputElement
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0]
      this.mediaService.uploadFile(file)
    }
  }
}
