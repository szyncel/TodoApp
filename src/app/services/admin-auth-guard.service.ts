import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.currentUser.role == 'admin') return true;
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
