import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public languageForm = new FormGroup({
    language: new FormControl('ua'),
  });

  public languages = [
    {
      label: 'UA',
      key: 'ua'
    },
    {
      label: 'RU',
      key: 'ru'
    },
    {
      label: 'EN',
      key: 'en'
    },
  ];

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.languageForm.patchValue({language: this.translateService.getDefaultLang()});
  }

  public changeLanguage($event: any) {
    this.translateService.use($event.value);
    this.translateService.setDefaultLang($event.value);
  }

  public logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']).then();
  }

}
