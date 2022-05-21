import { TestBed } from "@angular/core/testing";
import { TokenService } from './token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TokenService', () => {
  let service: TokenService;
  const fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjYyNmFkZWI1ZmFkN2UzNzllZjQzODA3ZSIsImVtYWlsIjoidXNlc' +
    'jFAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjUzMTQwODE5Mjg1LCJleHAiOjE2NTM3NDU2MTkyODV9.3tqan-6pTIAy052eu1pu4ZjBU' +
    'khCiwJVc3MG8TqJ9nT63L5CgHzvxCKBeGL_rwiROIcdiEwBkYPHe7TsPpoRGg';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TokenService);
  });


  it('should be auth', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'Admin');
    const result = service.isAuth;
    expect(result).toBeTrue();
  });

  it('should not be auth', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'User');
    const result = service.isAuth;
    expect(result).not.toBeTrue();
  });

  it('should write token', () => {
    const fakeId = '626adeb5fad7e379ef43807e';
    const fakeEmail = 'user1@gmail.com';
    const fakeRole = 'Admin';
    const fakeIat = '1653140819285';
    const fakeExp = '1653745619285';
    service.writeToken(fakeToken);
    expect(localStorage.getItem('token')).toEqual(fakeToken);
    expect(localStorage.getItem('id')).toEqual(fakeId);
    expect(localStorage.getItem('email')).toEqual(fakeEmail);
    expect(localStorage.getItem('role')).toEqual(fakeRole);
    expect(localStorage.getItem('iat')).toEqual(fakeIat);
    expect(localStorage.getItem('exp')).toEqual(fakeExp);
  });

  it('should delete token', () => {
    service.writeToken(fakeToken);
    service.deleteToken();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('iat')).toBeNull();
    expect(localStorage.getItem('exp')).toBeNull();
  });

  it('should get token', () => {
    service.writeToken(fakeToken);
    const result = service.getToken();
    expect(result).toEqual(fakeToken);
  });


});
