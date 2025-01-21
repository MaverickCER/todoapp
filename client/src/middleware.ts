import createMiddleware from 'next-intl/middleware';

export const locales = ['en', 'de', 'es', 'fr'];

export default createMiddleware({
  locales,
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest).*)'],
};
