import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../testing/mocks/service/translate-service.mock';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matSnackbarServiceMock } from '../testing/mocks/service/mat-snackbar-service.mock';
import { SocialAuthService } from 'angularx-social-login';
import { socialAuthServiceMock } from '../testing/mocks/service/social-auth-service.mock';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: MatSnackBar, useValue: matSnackbarServiceMock },
        { provide: SocialAuthService, useValue: socialAuthServiceMock },
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
