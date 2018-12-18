import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '@core/localstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localStorage: LocalstorageService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header.
    const token = this.localStorage.getItem('id_token');
    const authHeader = 'Bearer ' + token;
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
