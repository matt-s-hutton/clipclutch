import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DownloadParameters } from 'src/app/shared/models/download-parameters.type';
import { DownloadResponse } from 'src/app/shared/models/download-response.type';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  getDownloadLink(downloadParameters: DownloadParameters): Observable<DownloadResponse> {
    return this.http.post<DownloadResponse>('https://localhost/api/requestdownload', downloadParameters);
  }
}
