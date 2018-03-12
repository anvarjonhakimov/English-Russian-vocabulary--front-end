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
 * sign up component
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  /**
   * Sign up form group
   *
   * @type {FormGroup}
   * @memberOf SignUpComponent
   */
  public signUpForm: FormGroup;

  /**
   * Message to show after successful sign up
   *
   * @type {string}
   * @memberOf SignUpComponent
   */
  public message = '';

  /**
   * Checks if user submitted for sign up
   *
   * @type {boolean}
   * @memberOf SignUpComponent
   */
  public isSubmitted = false;

  /**
   * Checks if user successfully signed up
   *
   * @type {boolean}
   * @memberOf SignUpComponent
   */
  public submitSuccess = false;

  /**
   * Checks if user got error when signed up
   *
   * @type {boolean}
   * @memberOf SignUpComponent
   */
  public submitError = false;

  /**
   * Creates an instance of SignUpComponent
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
   * @memberOf SignUpComponent
   */
  private initFormGroup(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z_]{2,}.\.[a-zA-Z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Handles Sign Up button click
   *
   * @returns {void}
   * @memberOf SignUpComponent
   */
  public signUp(): void {
    if (this.signUpForm.valid) {
      const signUpData = this.signUpForm.value;

      if (signUpData.password === signUpData.confirmPassword) {
        this.authService.signUp(signUpData)
          .takeUntil(this.unSubscribe$)
          .subscribe((res) => {
            if (res.status === 'OK') {
              this.isSubmitted = true;
              this.submitError = false;
              this.submitSuccess = true;
              this.message = 'You successfully signed up! We have sent you an email with activation. Please check your email';
            }
          }, (err) => {
            if (err instanceof HttpErrorResponse) {
              this.submitError = true;
              this.message = err.error.status;
            }
          });
      } else {
        this.submitError = true;
        this.message = 'Confirm your password correctly.';
      }
    }
  }

  /**
   * Resets Sign Up form
   *
   * @returns {void}
   * @memberOf SignUpComponent
   */
  public resetForm(): void {
    this.signUpForm.reset({});
    this.submitError = false;
    this.message = '';
  }

  /**
   * Navigates to Sign In page
   *
   * @returns {void}
   * @memberOf SignUpComponent
   */
  public openSignIn(): void {
    this.router.navigate(['sign-in']);
  }

}
