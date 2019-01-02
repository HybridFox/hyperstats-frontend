import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

describe('Lang-interceptor.service', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    })
  );

  describe('intercept HTTP requests', () => {
    it('should add Accept-Language to Headers', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
        http.get('/api').subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne('/api');

        expect(request.request.headers.has('Authorization')).toEqual(true);
      }
    ));
  });
});
