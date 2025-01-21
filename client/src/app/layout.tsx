import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import type { Metadata } from 'next';
import './globals.css';

import { DynamicA11yCss } from '@/components/client';
import { Insights, Navbar } from '@/components/server';
import { config } from '@/contracts/config.constants';
import { TaskProvider } from '@/hooks/useTaskContext';
import { isLocaleRTL } from '@/libs/i18n/helpers';
import { AuthProvider } from '@/libs/nextauth';
import { QueryProvider } from '@/libs/query';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

async function getMessagesForLocale(locale: string) {
  return await getMessages({ locale });
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages: AbstractIntlMessages = await getMessagesForLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale || 'en'} dir={isLocaleRTL(locale) ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            <AuthProvider>
              <TaskProvider>
                <Navbar />
                <main className='p-3 max-w-3xl m-auto'>{children}</main>
                <Insights />
                {config.NEXT_PUBLIC_A11Y && <DynamicA11yCss />}
              </TaskProvider>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
