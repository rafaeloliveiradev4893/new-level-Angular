import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideAuth0({
      domain: "dev-c5nck27zn1v43s53.us.auth0.com",
      clientId: "jj7WfvjIQ2ZLd1ZuIJW9SGnkKmVRBuja",

      cacheLocation: 'localstorage',
      useRefreshTokens: true,

      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://newlevelauth.com'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiUrl}/api/*`,
            tokenOptions: {
              authorizationParams: {
                audience: 'https://newlevelauth.com'
              }
            }
          }
        ]
      }
    }),
  ]
};
