import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { usersList } from '../mocks/user.mock';
import { Book } from 'src/app/shop/book.interface';

export interface User {
  email: string;
  name: string;
  role: string;
  cart?: Book[];
}

export interface UserResponse extends User {
  password: string;
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Guest = 'guest',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  public getUserList(): Observable<UserResponse[]> {
    return of(usersList);
  }

  public setCurrentUser(user: User | null): void {
    this.currentUserSource.next(user);
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserSource.getValue();
  }
}
