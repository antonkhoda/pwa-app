import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthComponent } from './auth.component';
import { UserRole } from '../core/services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectLanguage', () => {
    const result = component.selectLanguage('uk_UA');
    expect(result).toBe('uk_UA');
  });

  it('login as unknown user', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    const result = component.login();
    expect(result).toBeUndefined();
  });

  it('loginAsGuest', () => {
    component.guestForm.controls['name'].setValue('Tom');
    const result = component.loginAsGuest();
    const expectation = {
      email: '',
      name: 'Tom',
      role: UserRole.Guest,
      cart: [],
    };
    expect(result).toEqual(expectation);
  });

  it('loginAsGuest rout', () => {
    component.loginAsGuest();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/shop']);
  });
});
