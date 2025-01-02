import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { urlInterceptor } from './core/interceptors/url.interceptor';


const firebaseConfig = {
  apiKey: "AIzaSyBL4brdTw07Th6cByK0bXoCdEhYdhuEVjA",
  authDomain: "inspiredauthapp.firebaseapp.com",
  projectId: "inspiredauthapp",
  storageBucket: "inspiredauthapp.firebasestorage.app",
  messagingSenderId: "316221502229",
  appId: "1:316221502229:web:8941453d24f8b836ce6f1c",
  measurementId: "G-7C1Z3YTMHQ"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptors([authInterceptor, urlInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ]
};

