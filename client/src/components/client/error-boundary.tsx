'use client';

import { logger } from '@/utils';
import { useTranslations } from 'next-intl';
import type { ComponentType, JSX } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const t = useTranslations('error');

  const handleError = (error: Error, info: { componentStack: string }) => {
    // Update state so the next render will show the fallback UI.
    const localStorageItems: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = `${localStorage.key(i)}`; // Get the key at index i
      const value = localStorage.getItem(key); // Get the value associated with the key
      localStorageItems[key] = `${value}`; // Store the key-value pair in the object
    }

    // Update state so the next render will show the fallback UI.
    const sessionStorageItems: Record<string, string> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = `${sessionStorage.key(i)}`; // Get the key at index i
      const value = sessionStorage.getItem(key); // Get the value associated with the key
      sessionStorageItems[key] = `${value}`; // Store the key-value pair in the object
    }

    const message = `
componentStack: ${(info.componentStack || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')};<br/><br/>
LocalStorage: ${JSON.stringify(localStorageItems).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')};<br/><br/>
SessionStorage: ${JSON.stringify(sessionStorageItems).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')};<br/><br/>
${error.stack}`;

    logger.error(message, error.stack);
  };

  const fallback = (
    <div className='error-boundary' role='alert'>
      <button onClick={() => window.location.reload()} type='button' aria-label={t('reset')}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' aria-hidden>
          <path
            fill='currentColor'
            d='M5 0v2h4v3.934A6.94 6.94 0 0 0 7.65 7H2v5h2V9h2.207c-.63 1.195-1.025 2.568-1.15 4H0v5h2v-3h3.063c.127 1.433.523 2.805 1.156 4H2v5h2v-3h3.674c1.232 1.245 2.756 1.997 4.326 2 1.575 0 3.103-.751 4.338-2H20v3h2v-5h-4.21a10.6 10.6 0 0 0 1.153-4H22v3h2v-5h-5.06c-.126-1.432-.52-2.805-1.15-4H20v3h2V7h-5.66A6.98 6.98 0 0 0 15 5.936V2h4V0h-6v5.162c-.331-.065-.665-.158-1-.162-.335.003-.669.096-1 .16V0H5Z'
          />
        </svg>
      </button>
      <span>
        <span className='sr-only'>{t('error')}: </span>
        {t('something_wrong')}
      </span>
    </div>
  );

  return (
    <Boundary fallback={fallback} onError={handleError}>
      {children}
    </Boundary>
  );
}

/**
 * Wraps a given component in an ErrorBoundary for error handling.
 *
 * @name withErrorBoundary
 * @description Adds an ErrorBoundary wrapper around the provided component.
 * @example
 * const SafeComponent = withErrorBoundary(MyComponent);
 *
 * @param Component - The component to wrap in an ErrorBoundary.
 *
 * @returns A new component wrapped with an ErrorBoundary.
 */
export function withErrorBoundary<ComponentProps>(Component: ComponentType<ComponentProps>) {
  return (props: ComponentProps & JSX.IntrinsicAttributes) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}

export default withErrorBoundary;
