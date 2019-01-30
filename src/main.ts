import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

declare var gtag;

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

bootstrap().catch(err => {

  gtag('event', 'exception', {
    'description': err,
    'fatal': false
  });

  console.log(err);
});
