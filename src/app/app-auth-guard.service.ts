import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: NbAuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return true;
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
