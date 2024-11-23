import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { FileUploaded } from '../../models/media.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent {
  private mediaService = inject(MediaService)
  private validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  imageFile?: File

  @Output() uploaded = new EventEmitter<FileUploaded>()

  get maxSize() {
    return 2 // MB
  }

  get validFileType() {
    return this.imageFile && this.validImageTypes.includes(this.imageFile.type)
  }

  get validFileSize() {
    return this.imageFile && this.imageFile.size <= (1024 ** 2) * this.maxSize;
  }

  openFile(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput || !fileInput.files) {
      return;
    }

    this.imageFile = fileInput.files[0];
    if (!this.imageFile) {
      return
    }

    if (!this.validFileType) {
      alert('Image type is invalid')
      this.imageFile = undefined
      return
    }

    if (!this.validFileSize) {
      alert('Image size is greater than 2MB')
      this.imageFile = undefined
      return
    }
  }

  upload() {
    if (!this.imageFile) {
      return
    }

    this.mediaService.uploadFile(this.imageFile).subscribe({
      next: (res) => {
        if (res.code !== 0) {
          alert(res.message)
          return
        }

        this.uploaded.emit(res.data)
      },
      error: (err) => {
        alert(err)
      }
    })
  }

  clear() {
    this.imageFile = undefined
  }
}
