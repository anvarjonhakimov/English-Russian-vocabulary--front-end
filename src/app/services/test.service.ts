import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ITestActions } from '../models';
import { API_URL } from '../utils';

/**
 * Service for operations with test
 */
@Injectable()
export class TestService {

  /**
   * Creates an instance of TestService
   *
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Calls back-end api and gets words with options for test
   *
   * @returns {Observable<ITestActions>}
   * @memberOf TestService
   */
  public getWordsForTest(): Observable<ITestActions> {
    return this.http.get(`${API_URL}/test/words-for-test`)
      .map((res) => res as ITestActions);
  }

  /**
   * Calls back-end api and updates test result of user
   *
   * @param {number} testScore
   * @returns {Observable<ITestActions>}
   * @memberOf TestService
   */
  public testResult(testScore: number): Observable<ITestActions> {
    const data = {
      testScore: testScore
    };

    return this.http.post(`${API_URL}/test/test-result`, data)
      .map((res) => res as ITestActions);
  }

}
