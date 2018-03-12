import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from '../services';

/**
 * Verify component
 */
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<void> = new Subject<void>();

  private activationCode = this.route.snapshot.params.activationCode;
  private timeOutId: any;

  /**
   * Message to show the status of user's email verification
   *
   * @type {string}
   * @memberOf VerifyComponent
   */
  public message: string;

  /**
   * Checks if user's email address successfully verified
   *
   * @type {boolean}
   * @memberOf SignUpComponent
   */
  public verifySuccess = false;

  /**
   * Checks if user got error when verified email address
   *
   * @type {boolean}
   * @memberOf SignUpComponent
   */
  public verifyError = false;

  /**
   * Creates an instance of VerifyComponent
   *
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {AuthService} authService - injected auth service
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.verifyEmail();
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
   * Verifies email address after sign up
   *
   * @returns {void}
   * @memberOf VerifyComponent
   */
  private verifyEmail(): void {
    this.authService.verifyEmail(this.activationCode)
      .takeUntil(this.unSubscribe$)
      .subscribe((res) => {
        if (res.status === 'OK') {
          this.verifySuccess = true;
          this.message = 'Your email address successfully verified!';

          this.timeOutId = setTimeout(() => {
            this.router.navigate(['sign-in']);
          }, 3000);
        }
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          this.verifyError = true;
          this.message = err.error.status;
        }
      });
  }

}
