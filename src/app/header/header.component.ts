import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  AuthService,
  UserService
} from '../services';
import { IUser } from '../models';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  /**
   * Checks if user is logged in
   *
   * @type {boolean}
   * @memberOf HeaderComponent
   */
  public isLoggedIn: boolean;

  /**
   * Current user
   *
   * @type {IUser}
   * @memberOf HeaderComponent
   */
  public user: IUser;

  /**
   * Creates an instance of HeaderComponent
   *
   * @param {AuthService} authService - injected auth service
   * @param {UserService} userService - injected user service
   * @param {Router} router
   */
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.getCurrentUserData();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  /**
   * Checks if user is logged in
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  private isUserLoggedIn(): boolean {
    this.authService.isLoggedIn
      .takeUntil(this.unSubscribe$)
      .subscribe((res: boolean) => {
        this.isLoggedIn = res;
      });

    return this.isLoggedIn;
  }

  /**
   * Gets current user information
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  private getCurrentUserData(): void {
    if (this.isUserLoggedIn()) {
      this.userService.getCurrentUserData()
        .takeUntil(this.unSubscribe$)
        .subscribe((res) => {
          if (res.status === 'OK') {
            this.user = <IUser>res.data;
          }
        });
    }
  }

  /**
   * Navigates to Home page
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  public openHomePage(): void {
    this.router.navigate(['']);
  }

  /**
   * Navigates to Sign In page
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  public openSignIn(): void {
    this.router.navigate(['sign-in']);
  }

  /**
   * Navigates to Sign Up page
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  public openSignUp(): void {
    this.router.navigate(['sign-up']);
  }

  /**
   * Handles Sign Out
   *
   * @returns {void}
   * @memberOf HeaderComponent
   */
  public signOut(): void {
    this.authService.signOut()
      .takeUntil(this.unSubscribe$)
      .subscribe((res) => {
        if (res.status === 'OK') {
          localStorage.removeItem('token');
          this.authService.isLoggedIn.next(false);
          this.router.navigate(['sign-in']);
        }
      });
  }

}
