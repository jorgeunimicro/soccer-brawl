import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';
import {environment as env} from '../../environments/environment';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user && env.admins.indexOf(user.email) >= 0)
    );
  }
}
