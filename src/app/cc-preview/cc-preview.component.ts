import { Component } from '@angular/core';

@Component({
  selector: 'cc-preview',
  templateUrl: './cc-preview.component.html',
  styleUrls: ['./cc-preview.component.css']
})
export class CcPreviewComponent {
  public video = true;
  public minutes = 25;
}