import { Component, Input } from '@angular/core';
import { DownloadDetails } from '../shared/models/download-response.type';
import { BASE_URL } from '../shared/const/base_url.const';

@Component({
  selector: 'cc-preview',
  templateUrl: './cc-preview.component.html',
  styleUrls: ['./cc-preview.component.css']
})
export class CcPreviewComponent {
  @Input() show = false;
  @Input() loading = false;
  @Input() dl: DownloadDetails | null = null;

  public baseUrl = BASE_URL;
}
