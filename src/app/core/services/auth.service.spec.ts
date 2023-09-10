import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { usersList } from '../mocks/user.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserList', (done) => {
    service.getUserList().subscribe((result) => {
      expect(result).toBe(usersList);
      done();
    });
  });

  it('setCurrentUser', (done) => {
    const user = {
      email: '',
      name: '',
      role: '',
      cart: [],
    };
    service.setCurrentUser(user);
    service.currentUser$.subscribe((result) => {
      expect(result).toEqual(user);
      done();
    });
  });

  it('isLoggedIn should return false', () => {
    service.setCurrentUser(null);
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('isLoggedIn should return true', () => {
    const user = {
      email: '',
      name: '',
      role: '',
      cart: [],
    };
    service.setCurrentUser(user);
    expect(service.isLoggedIn()).toBeTrue();
  });
});
