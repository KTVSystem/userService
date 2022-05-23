import { TestBed } from "@angular/core/testing";
import { NotificationService } from './notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../../../../testing/mocks/service/translate-service.mock';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matSnackbarServiceMock } from '../../../../testing/mocks/service/mat-snackbar-service.mock';
import { redirectServiceMock } from '../../../../testing/mocks/service/redirect-service.mock';
import { RedirectService } from '../redirect/redirect.service';


describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: MatSnackBar, useValue: matSnackbarServiceMock },
        { provide: RedirectService, useValue: redirectServiceMock },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be initialized', () => {
    const result = service.isInitialized('test');
    expect(result).toBeTrue();
  });


});
