import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9744ea0dd9fe0d4f4cf895cb6299062d@o4511436293734400.ingest.us.sentry.io/4511541128527872',
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'production',
});
