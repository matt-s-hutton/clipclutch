import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DownloadParameters } from 'src/app/shared/models/download-parameters.type';
import { DownloadResponse } from 'src/app/shared/models/download-response.type';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getDownloadLink(downloadParameters: DownloadParameters): Observable<DownloadResponse> {
    const baseUrl = this.configService.config.baseUrl;
    const apiPath = this.configService.config.apiPath;
    const apiDownloadPath = this.configService.config.apiDownloadPath;
    return this.http.post<DownloadResponse>(`${baseUrl}${apiPath}${apiDownloadPath}`, downloadParameters);
  }
}
