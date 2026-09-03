import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain: "dev-c5nck27zn1v43s53.us.auth0.com",
      clientId: "jj7WfvjIQ2ZLd1ZuIJW9SGnkKmVRBuja",

      cacheLocation: 'localstorage',
      useRefreshTokens: true,

      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ]
};
