import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

/**
 * The route guard that activates navigation
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of AuthGuard
   *
   * @param {Router} router
   */
  constructor(private router: Router) {
  }

  /**
   * Guards routes
   *
   * @returns {boolean}
   * @memberOf AuthGuard
   */
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['sign-in']);
      return false;
    }
  }

}
