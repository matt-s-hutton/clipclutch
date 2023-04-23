import { Component, Input } from '@angular/core';
import { DownloadDetails } from '../shared/models/download-response.type';
import { ConfigService } from '../services/config/config.service';
import { Config } from '../shared/models/config.type';

@Component({
  selector: 'cc-preview',
  templateUrl: './cc-preview.component.html',
  styleUrls: ['./cc-preview.component.css']
})
export class CcPreviewComponent {
  @Input() show = false;
  @Input() loading = false;
  @Input() dl: DownloadDetails | null = null;
  @Input() error: string | null = null;

  public config: Config;
  public baseUrl: string;

  constructor(private configService: ConfigService) {
    this.config = this.configService.config;
    this.baseUrl = this.config.baseUrl;
  }
}
