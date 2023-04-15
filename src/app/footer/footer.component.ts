import { Component } from '@angular/core';
import { ConfigService } from '../services/config/config.service';
import { Config } from '../shared/models/config.type';

@Component({
  selector: 'cc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public config: Config;

  public year;
  public name;

  constructor(configService: ConfigService) {
    this.config = configService.config;
    this.year = new Date().getFullYear();
    this.name = this.config.baseUrl.split('//')[1];
  }
}
