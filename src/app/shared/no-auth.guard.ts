import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => loggedIn ? this.router.navigate(['/profile']) : loggedIn),
      map(loggedIn => !loggedIn)
    );
  }
}
