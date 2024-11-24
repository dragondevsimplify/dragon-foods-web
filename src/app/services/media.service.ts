import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { FileUploaded } from '../models/media.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient)

  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post<Response<FileUploaded>>(environment.apiUrl + '/media/uploadImage', fd, {
      headers: {
        contentType: "multipart/form-data",
      },
    })
  }
}
