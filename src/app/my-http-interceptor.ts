import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

/**
 * Service for operations with Http headers
 */
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of MyHttpInterceptor
   * @param {Router} router
   */
  constructor(private router: Router) {
  }

  /**
   * Adds Authorization header to HttpRequest
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    let authReq;

    if (token) {
      authReq = req.clone({
        headers: req.headers.append('Authorization', `${token}`)
      });
    } else {
      authReq = req.clone({
        headers: req.headers.delete('Authorization')
      });
    }

    return next
      .handle(authReq)
      .catch((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['sign-in']);
          }
        }

        return Observable.throw(error);
      }) as any;
  }
}
