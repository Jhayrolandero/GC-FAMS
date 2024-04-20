import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { commexReducer } from './app/state/commex/commex.reducer';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));






