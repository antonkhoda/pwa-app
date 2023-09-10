import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [{ provide: Router, useValue: mockRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isBookInCart should return true', () => {
    component.currentUser = {
      email: '',
      name: '',
      role: '',
      cart: [
        {
          createdTime: '',
          fields: {
            Amazon_Link: '',
            Author: '',
            Country: '',
            Title: '',
            price: 100,
          },
          id: '0',
        },
      ],
    };
    const result = component.isBookInCart('0');
    expect(result).toBeTruthy();
  });

  it('isBookInCart should return false', () => {
    const result = component.isBookInCart('0');
    expect(result).toBeFalsy();
  });

  it('onAddToCart', () => {
    component.currentUser = {
      email: '',
      name: '',
      role: '',
      cart: [],
    };
    const arg = {
      createdTime: '',
      fields: {
        Amazon_Link: '',
        Author: '',
        Country: '',
        Title: '',
        price: 100,
      },
      id: '0',
    };
    const result = component.onAddToCart(arg);
    const expectation = {
      ...component.currentUser,
      cart: [arg],
    };
    expect(result).toEqual(expectation);
  });

  it('onMakeOrder expect list message', () => {
    component.currentUser = {
      email: '',
      name: '',
      role: '',
      cart: [
        {
          createdTime: '',
          fields: {
            Amazon_Link: '',
            Author: '',
            Country: '',
            Title: 'Book',
            price: 100,
          },
          id: '0',
        },
      ],
    };
    expect(component.onMakeOrder()).toBe('Your order is: Book');
  });

  it('onMakeOrder expect cart empty message', () => {
    expect(component.onMakeOrder()).toBe('Your cart is empty');
  });

  it('onLogOut', () => {
    component.onLogOut();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('selectLanguage', () => {
    const result = component.selectLanguage('uk_UA');
    expect(result).toBe('uk_UA');
  });
});
