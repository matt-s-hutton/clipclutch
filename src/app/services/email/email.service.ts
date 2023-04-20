import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { EmailParameters } from 'src/app/shared/models/email-parameters.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  sendEmail(emailParameters: EmailParameters): Observable<any> {
    const baseUrl = this.configService.config.baseUrl;
    const apiPath = this.configService.config.apiPath;
    const apiEmailPath = this.configService.config.apiEmailPath;
    return this.http.post<any>(`${baseUrl}${apiPath}${apiEmailPath}`, emailParameters);
  }
}
