import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../book.interface';
import { UserRole } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Input() public order?: Book[] = [];
  @Input() public userRole?: string = UserRole.Guest;
  @Input() public isOpenWindow: boolean = false;
  @Output() clearAll = new EventEmitter<void>();
  @Output() makeOrder = new EventEmitter<void>();

  public getTotalPrice(): number {
    return (
      this.order?.reduce(
        (total, value) => total + (value.fields.price || 0),
        0
      ) || 0
    );
  }

  public onClearAll(): void {
    this.isOpenWindow = false;
    this.clearAll.emit();
  }

  public onMakeOrder(): void {
    this.isOpenWindow = false;
    this.makeOrder.emit();
  }

  public onOpenWindow(): void {
    this.isOpenWindow = !this.isOpenWindow;
  }

  public isRoleIsUser(role?: string): boolean {
    return role === UserRole.User;
  }
}
