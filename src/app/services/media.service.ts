import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { UploadImage } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient)

  uploadFile(file: File) {
    return this.http.post<Response<UploadImage>>('http://localhost:3000/media/uploadImage', file)
  }
}
