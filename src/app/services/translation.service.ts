import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  public changeLanguage(language: string): void {
    this.translate.use(language);
  }

  public getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}