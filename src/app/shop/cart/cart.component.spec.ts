import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CartComponent } from './cart.component';
import { UserRole } from 'src/app/core/services/auth.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.isOpenWindow = true;
    component.userRole = UserRole.User;
    component.order = [
      {
        createdTime: '',
        fields: {
          Amazon_Link: '',
          Author: '',
          Country: '',
          Title: '',
          price: 100,
        },
        id: '',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isRoleIsUser', () => {
    const result = component.isRoleIsUser(UserRole.Admin);
    expect(result).toBeFalse();
  });

  it('onOpenWindow with default input', () => {
    component.onOpenWindow();
    expect(component.isOpenWindow).toBeFalse();
  });

  it('onOpenWindow', () => {
    component.isOpenWindow = false;
    component.onOpenWindow();
    expect(component.isOpenWindow).toBeTruthy();
  });

  it('getTotalPrice', () => {
    const result = component.getTotalPrice();
    expect(result).toBe(100);
  });

  it('onClearAll', () => {
    const event = spyOn(component.clearAll, 'emit');
    component.onClearAll();
    expect(event).toHaveBeenCalled();
  });

  it('onMakeOrder', () => {
    const event = spyOn(component.makeOrder, 'emit');
    component.onMakeOrder();
    expect(event).toHaveBeenCalled();
  });

  it('onMakeOrder by button', () => {
    const event = spyOn(component.makeOrder, 'emit');
    const button = fixture.debugElement.query(By.css('.make-order'));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });
});
