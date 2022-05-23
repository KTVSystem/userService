import { TestBed } from "@angular/core/testing";
import { RedirectService } from './redirect.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../../../../login/login.component';


describe('LoginService', () => {
  let service: RedirectService;
  let router: Router;
  let mockRouter: { navigate: any; };

  beforeEach(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      providers: [
        RedirectService,
        { provide: Router, useValue: mockRouter }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
    });
    service = TestBed.inject(RedirectService);
  });


  /*it('should be properly redirect', () => {
    const link = '/login';
    const time = 100;

    service.redirect(link, time);
    //mockRouter.navigate(['/login']);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });*/



});
