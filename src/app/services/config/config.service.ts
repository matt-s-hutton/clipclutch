import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Config } from 'src/app/shared/models/config.type';
import { DEFAULT_CONFIG } from 'src/app/shared/const/default-config.const';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configPath = 'assets/config.json';
  public config: Config = DEFAULT_CONFIG;

  constructor(private http: HttpClient) { }

  public loadConfig(): Promise<void | Config> {
    return lastValueFrom(this.http.get<Config>(this.configPath)).then( (configFile: Config) => {
      this.config = {...DEFAULT_CONFIG, ...configFile};
    });
  }
}