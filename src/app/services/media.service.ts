import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { FileUploaded } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient)

  uploadFile(file: File) {
    return this.http.post<Response<FileUploaded>>('http://localhost:3000/media/uploadImage', file)
  }
}
