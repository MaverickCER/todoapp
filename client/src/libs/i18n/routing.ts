import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from '@/middleware';

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
  localeCookie: true,
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
