import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GetInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const customRequest = req.clone({
        headers: req.headers.set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
      });
      return next.handle(customRequest);
    }

    return next.handle(req);
  }
}
