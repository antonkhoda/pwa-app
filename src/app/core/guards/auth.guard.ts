import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  private check(): boolean {
    return this.authService.isLoggedIn();
  }

  public canActivate(): boolean {
    if (!this.check()) {
      this.router.navigate(['/']);
    }
    return this.check();
  }

  public canLoad(): boolean {
    return this.check();
  }
}
