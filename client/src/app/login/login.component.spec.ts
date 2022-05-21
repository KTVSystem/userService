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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
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

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.name').textContent).toContain('User CRM');
  });

  it('should be login form invalid', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.loginForm.patchValue({password: '', email: ''});
    expect(app.loginForm.invalid).toBeTrue();
  });

  it('should be login form valid', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.loginForm.patchValue({password: '123', email: 'test@gmail.com'});
    expect(app.loginForm.valid).toBeTrue();
  });

  it('should be email invalid', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.loginForm.patchValue({password: '123', email: ''});
    expect(app.loginForm.get('password')?.status).toBe('VALID');
    expect(app.loginForm.get('email')?.status).toBe('INVALID');
  });

  it('should be password invalid', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    app.loginForm.patchValue({password: '', email: 'test@gmail.com'});
    expect(app.loginForm.get('email')?.status).toBe('VALID');
    expect(app.loginForm.get('password')?.status).toBe('INVALID');
  });

});
