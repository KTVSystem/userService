import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public languageForm = new FormGroup({
    language: new FormControl(''),
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
  public unsubscribe$ = new Subject();

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('ua');
    this.languageForm.patchValue({language: 'ua'});
    this.languageForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      this.translateService.use(value.language);
      this.translateService.setDefaultLang(value.language);
    });
  }

  public logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']).then();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
