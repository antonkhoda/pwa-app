import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './../core/services/data.service';
import { Book } from './book.interface';
import { AuthService, User } from '../core/services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  public library!: Book[];
  public currentBook!: Book;
  public currentUser: User | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.dataService
        .getStoreUrl()
        .pipe(
          switchMap((response) =>
            this.dataService.getCompiledLibraryData(response)
          )
        )
        .subscribe((data) => {
          this.library = data;
          this.getRandomBook();
        })
    );
    this.subscriptions.add(
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public isBookInCart(bookId: string): boolean {
    return !!this.currentUser?.cart?.find((value) => value.id === bookId);
  }

  public onAddToCart(book: Book): User {
    const result = {
      ...this.currentUser,
      cart: [...(this.currentUser?.cart as Book[]), book],
    } as User;

    this.authService.setCurrentUser(result);
    return result;
  }

  public onCleareCart(): void {
    this.authService.setCurrentUser({
      ...this.currentUser,
      cart: [],
    } as User);
  }

  public onMakeOrder(): string {
    if (this.currentUser?.cart?.length) {
      return `Your order is: ${this.currentUser?.cart?.map(
        (value) => value.fields.Title
      )}`;
    }
    return 'Your cart is empty';
  }

  public onLogOut(): void {
    this.authService.setCurrentUser(null);
    this.router.navigate(['/']);
  }

  public getRandomBook(): void {
    this.currentBook =
      this.library[Math.floor(Math.random() * this.library.length)];
  }

  public selectLanguage(value: string): string {
    this.translateService.use(value);
    return value;
  }
}
