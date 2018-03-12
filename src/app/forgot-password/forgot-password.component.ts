import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../services';

/**
 * Forgot password component
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  /**
   * Forgot password form group
   *
   * @type {FormGroup}
   * @memberOf ForgotPasswordComponent
   */
  public forgotPasswordForm: FormGroup;

  /**
   * Checks if user submitted for forgot password
   *
   * @type {boolean}
   * @memberOf ForgotPasswordComponent
   */
  public isSubmitted = false;

  /**
   * Checks if user successfully requested for forgot password
   *
   * @type {boolean}
   * @memberOf ForgotPasswordComponent
   */
  public submitSuccess = false;

  /**
   * Checks if user got error when requesting for forgot password
   *
   * @type {boolean}
   * @memberOf ForgotPasswordComponent
   */
  public submitError = false;

  /**
   * Message to show after successful request for forgot password
   *
   * @type {string}
   * @memberOf ForgotPasswordComponent
   */
  public message = '';

  /**
   * Creates an instance of ForgotPasswordComponent
   *
   * @param {AuthService} authService - injected auth service
   * @param formBuilder
   */
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.initFromGroup();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  /**
   * Form group initialization
   *
   * @returns {void}
   * @memberOf ForgotPasswordComponent
   */
  private initFromGroup(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z_]{2,}.\.[a-zA-Z]{2,3}')]]
    });
  }

  /**
   * Creates recovery code for resetting password
   *
   * @returns {void}
   * @memberOf ForgotPasswordComponent
   */
  public forgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordData = this.forgotPasswordForm.value;

      this.authService.forgotPassword(forgotPasswordData)
        .takeUntil(this.unSubscribe$)
        .subscribe((res) => {
          if (res.status === 'OK') {
            this.isSubmitted = true;
            this.submitError = false;
            this.submitSuccess = true;
            this.message = 'We have sent a recovery code. Please check your Email address.';
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
   * @memberOf ForgotPasswordComponent
   */
  public resetForm(): void {
    this.forgotPasswordForm.reset({});
    this.submitError = false;
    this.message = '';
  }

}
