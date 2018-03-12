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
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../services';

/**
 * Reset password component
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  private username = this.route.snapshot.params.username;
  private recoveryCode = this.route.snapshot.params.recoveryCode;
  private timeOutId: any;

  /**
   * Reset password form group
   *
   * @type {FormGroup}
   * @memberOf ResetPasswordComponent
   */
  public resetPasswordForm: FormGroup;

  /**
   * Checks if user submitted for reset password
   *
   * @type {boolean}
   * @memberOf ResetPasswordComponent
   */
  public isSubmitted = false;

  /**
   * Checks if user successfully reset password
   *
   * @type {boolean}
   * @memberOf ResetPasswordComponent
   */
  public submitSuccess = false;

  /**
   * Checks if user got error when resetting password
   *
   * @type {boolean}
   * @memberOf ResetPasswordComponent
   */
  public submitError = false;

  /**
   * Message to show after successful password reset
   *
   * @type {string}
   * @memberOf ResetPasswordComponent
   */
  public message = '';

  /**
   * Creates an instance of ResetPasswordComponent
   *
   * @param {AuthService} authService - injected auth service
   * @param {FormBuilder} formBuilder
   * @param {ActivatedRoute} route
   * @param {Router} router
   */
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
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
    clearTimeout(this.timeOutId);
  }

  /**
   * Form group initialization
   *
   * @returns {void}
   * @memberOf ResetPasswordComponent
   */
  private initFromGroup(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Resets user's old password to new password
   *
   * @returns {void}
   * @memberOf ResetPasswordComponent
   */
  public resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const resetPasswordData = this.resetPasswordForm.value;

      resetPasswordData.username = this.username;
      resetPasswordData.recoveryCode = this.recoveryCode;

      if (resetPasswordData.newPassword === resetPasswordData.confirmPassword) {
        this.authService.resetPassword(resetPasswordData)
        .takeUntil(this.unSubscribe$)
        .subscribe((res) => {
          if (res.status === 'OK') {
            this.isSubmitted = true;
            this.submitError = false;
            this.submitSuccess = true;
            this.message = 'You successfully reset your password.';

            this.timeOutId = setTimeout(() => {
              this.router.navigate(['sign-in']);
            }, 3000);
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
   * Resets Forgot password form
   *
   * @returns {void}
   * @memberOf ResetPasswordComponent
   */
  public resetForm(): void {
    this.resetPasswordForm.reset({});
    this.submitError = false;
    this.message = '';
  }

}
