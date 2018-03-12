import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import {
  IAuthActions,
  ISignInData,
  ISignUpData
} from '../models';
import { API_URL } from '../utils';
import { IForgotPasswordData } from '../models/auth';

/**
 * Service for operations with user authentication
 */
@Injectable()
export class AuthService {

  /**
   * For checking if user is logged in
   *
   * @type {BehaviorSubject<boolean>}
   * @memberOf AuthService
   */
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  /**
   * Creates an instance of AuthService
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Calls back-end api and signs up user
   *
   * @param {ISignUpData} data
   * @returns {Observable<IAuthActions>}
   * @memberOf AuthService
   */
  public signUp(data: ISignUpData): Observable<IAuthActions> {
    data.origin = location.protocol + '//' + location.host;

    return this.http.post(`${API_URL}/auth/sign-up`, data)
      .map((res) => res as IAuthActions);
  }

  /**
   * Calls back-end api and signs in user
   *
   * @param {ISignInData} data
   * @returns {Observable<IAuthActions>}
   * @memberOf AuthService
   */
  public signIn(data: ISignInData): Observable<IAuthActions> {
    return this.http.post(`${API_URL}/auth/sign-in`, data)
      .map((res) => res as IAuthActions);
  }

  /**
   * Calls back-end api and signs out user
   *
   * @returns {Observable<any>}
   * @memberOf AuthService
   */
  public signOut(): Observable<any> {
    return this.http.get(`${API_URL}/auth/sign-out`);
  }

  /**
   * Calls back-end api and verifies user Email address with the given activation code
   *
   * @param {string} activationCode
   * @returns {Observable<IAuthActions>}
   * @memberOf AuthService
   */
  public verifyEmail(activationCode: string): Observable<IAuthActions> {
    return this.http.get(`${API_URL}/auth/verify/${activationCode}`)
      .map((res) => res as IAuthActions);
  }

  /**
   * Calls back-end api and sends recovery code to user's email address
   *
   * @param {IForgotPasswordData} data
   * @returns {Observable<IAuthActions>}
   * @memberOf AuthService
   */
  public forgotPassword(data: IForgotPasswordData): Observable<IAuthActions> {
    data.origin = location.protocol + '//' + location.host;

    return this.http.post(`${API_URL}/auth/forgot-password`, data)
      .map((res) => res as IAuthActions);
  }

  /**
   * Calls back-end api and resets user password
   *
   * @param data
   * @returns {Observable<IAuthActions>}
   * @memberOf AuthService
   */
  public resetPassword(data): Observable<IAuthActions> {
    return this.http.post(`${API_URL}/auth/reset-password`, data)
      .map((res) => res as IAuthActions);
  }

}
