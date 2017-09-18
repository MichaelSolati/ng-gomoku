import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from '../services';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private _router: Router, private _us: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._us.user
      .map((user: any) => {
        if (!user) {
          this._router.navigate(['/', 'sign-in']);
          return false;
        }
        return true;
      })
      .catch((error: any) => {
        this._router.navigate(['/', 'sign-in']);
        return Observable.of(false);
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
