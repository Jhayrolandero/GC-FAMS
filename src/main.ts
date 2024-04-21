
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideState, provideStore } from '@ngrx/store';
import { certReducer } from './app/state/certs/cert.reducer';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


      // providers: [
    //   provideEffects(CertEffects),
    //   provideState({ name: 'cert', reducer:certReducer })
    // ],