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
  isUploaded = false

  @Output() uploaded = new EventEmitter<FileUploaded>()
  @Output() cleared = new EventEmitter<void>()

  get maxSize() {
    return 2 // MB
  }

  validateFileType(file: File) {
    return file && this.validImageTypes.includes(file.type)
  }

  validateFileSize(file: File) {
    return file && file.size <= (1024 ** 2) * this.maxSize;
  }

  validateFile(file: File) {
    if (!file) {
      return false;
    }

    if (!this.validateFileType(file)) {
      alert('Image type is invalid')
      return false;
    }

    if (!this.validateFileSize(file)) {
      alert('Image size is greater than 2MB')
      return false;
    }

    return this.imageFile = file;
  }

  openFile(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput || !fileInput.files) {
      return;
    }

    this.validateFile(fileInput.files[0]);
  }

  upload() {
    if (!this.imageFile) {
      return
    }

    this.mediaService.uploadFile(this.imageFile).subscribe({
      next: (res) => {
        if (res.code !== 0) {
          alert(res.message)
          this.isUploaded = false
          return
        }

        this.isUploaded = true
        this.uploaded.emit(res.data)
      },
      error: (err) => {
        alert(err)
        this.clear()
      }
    })
  }

  clear() {
    this.imageFile = undefined
    this.isUploaded = false
    this.cleared.emit()
  }

  dropFile(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    const dt = e.dataTransfer;
    if (!dt) {
      return;
    }

    this.validateFile(dt.files[0])
  }

  dragOverFile(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }
}
