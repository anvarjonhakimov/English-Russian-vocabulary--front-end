import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUserActions } from '../models';
import { API_URL } from '../utils';

/**
 * Service for operations with user
 */
@Injectable()
export class UserService {

  /**
   * Creates an instance of UserService
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Calls back-end api and loads signed in user information
   *
   * @returns {Observable<IUserActions>}
   * @memberOf UserService
   */
  public getCurrentUserData(): Observable<IUserActions> {
    return this.http.get(`${API_URL}/users/current`)
      .map((res) => res as IUserActions);
  }

}
