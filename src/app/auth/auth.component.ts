import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  AuthService,
  User,
  UserResponse,
  UserRole,
} from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public loginForm!: FormGroup;
  public guestForm!: FormGroup;
  public isGuest: boolean = false;
  public isShowMessage: boolean = false;
  private subscriptions: Subscription = new Subscription();
  private userList: UserResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.createForms();
    this.subscriptions.add(
      this.authService.getUserList().subscribe((data) => (this.userList = data))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public selectLanguage(value: string): string {
    this.translateService.use(value);
    return value;
  }

  public login(): User | undefined {
    const currentUser = this.userList.find(
      (value) =>
        value.email === this.loginForm.controls['email'].value &&
        value.password === this.loginForm.controls['password'].value
    );

    if (currentUser) {
      this.authService.setCurrentUser({ ...currentUser, cart: [] });
      this.router.navigate(['/shop']);
    }

    this.isShowMessage = true;
    this.loginForm.controls['password'].setValue('');
    return currentUser;
  }

  public loginAsGuest(): User {
    const name = this.guestForm.controls['name'].value;
    const currentUser: User = {
      email: '',
      name: name,
      role: UserRole.Guest,
      cart: [],
    };

    this.authService.setCurrentUser(currentUser);
    this.router.navigate(['/shop']);
    return currentUser;
  }

  public onChangeWindow(): void {
    this.isGuest = !this.isGuest;
  }

  private createForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.guestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
