import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from '../services';

/**
 * Sign in component
 */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  /**
   * Sign in form group
   *
   * @type {FormGroup}
   * @memberOf SignInComponent
   */
  public signInForm: FormGroup;

  /**
   * Checks if user got error when signing in
   *
   * @type {boolean}
   * @memberOf SignInComponent
   */
  public submitError = false;

  /**
   * Message to show errors when signing in
   *
   * @type {string}
   * @memberOf SignInComponent
   */
  public message = '';

  /**
   * Creates an instance of SignInComponent
   *
   * @param {Router} router
   * @param {AuthService} authService - injected auth service
   * @param {FormBuilder} formBuilder
   */
  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.initFormGroup();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  /**
   * Form Group initialization
   *
   * @returns {void}
   * @memberOf SignInComponent
   */
  private initFormGroup(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z_]{2,}.\.[a-zA-Z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles Sign In button click
   *
   * @returns {void}
   * @memberOf SignInComponent
   */
  public signIn(): void {
    if (this.signInForm.valid) {
      const signInData = this.signInForm.value;

      this.authService.signIn(signInData)
        .takeUntil(this.unSubscribe$)
        .subscribe((res) => {
          if (res.status === 'OK') {
            this.submitError = false;
            localStorage.setItem('token', res.token);
            this.authService.isLoggedIn.next(true);
            this.router.navigate(['words-list']);
          }
        }, (err) => {
          if (err instanceof HttpErrorResponse) {
            this.submitError = true;
            this.message = err.error.status;
          }
        });
    }
  }

  /**
   * Resets Forgot password form
   *
   * @returns {void}
   * @memberOf SignInComponent
   */
  public resetForm(): void {
    this.signInForm.reset({});
    this.submitError = false;
    this.message = '';
  }

  /**
   * Navigates to Sign Up page
   *
   * @returns {void}
   * @memberOf SignInComponent
   */
  public openSignUp(): void {
    this.router.navigate(['sign-up']);
  }

  /**
   * Navigates to Forgot password page
   *
   * @returns {void}
   * @memberOf SignInComponent
   */
  public openForgotPassword(): void {
    this.router.navigate(['forgot-password']);
  }

}
