import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url/url.interceptor';
import { TokenInterceptor } from './token/token.interceptor';
import { ResponseInterceptor } from './response/response.interceptor';

export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true,
  },
];
