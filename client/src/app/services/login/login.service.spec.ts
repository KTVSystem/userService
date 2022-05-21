import { TestBed } from "@angular/core/testing";
import { LoginService } from './login.service';
import { Login } from '../../models/login/login';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialUser } from '../../models/login/social-user';


describe('Loginervice', () => {
  let service: LoginService;
  let httpSpy: Spy<HttpClient>;
  const fakeLogin: Login = {
      email: 'fake@fake.com',
      password: '123'
  };
  const fakeSocialUser: SocialUser = {
    id: '1',
    email: 'fake@fake.com',
    firstName: 'fakeFirstName',
    lastName: 'fakeLastName',
    photoUrl: 'fakePhotoUrl',
    provider: 'fakeProvider',
  }
  const fakeToken: any = {
    token: 'fake-token'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should get token when sign in', (done: DoneFn) => {
    httpSpy.post.and.nextWith(fakeToken);
    service.signIn(fakeLogin).subscribe(response => {
      expect(response).toEqual(fakeToken);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should get token when sign in via socials', (done: DoneFn) => {
    httpSpy.post.and.nextWith(fakeToken);
    service.signInSocial(fakeSocialUser).subscribe(response => {
      expect(response).toEqual(fakeToken);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should clear block data', () => {
    localStorage.setItem('wrong', '5');
    localStorage.setItem('block', '1');
    service.clearBlockData();
    expect(localStorage.getItem('wrong')).toBeNull();
    expect(localStorage.getItem('block')).toBeNull();
  });

  it('should store wrong attemp', () => {
    localStorage.setItem('wrong', '1');
    service.storeWrongAttemp();
    expect(localStorage.getItem('wrong')).toEqual('2');
  });

  it('should block user', () => {
    service.blockUser();
    expect(localStorage.getItem('block')).not.toBeNull();
  });

  it('should is block user', () => {
    const currentTime = new Date().getTime();
    localStorage.setItem('block', String(currentTime + 5 * 60000));
    const result = service.isBlockUser();
    expect(result).toBeTrue();
  });

});
