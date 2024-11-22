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

  imageFile?: File

  @Output() uploaded = new EventEmitter<FileUploaded>()

  openFile(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput || !fileInput.files) {
      return;
    }

    this.imageFile = fileInput.files[0];
    if (!this.imageFile) {
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
