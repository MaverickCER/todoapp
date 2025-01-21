'use client';

import { Language } from '@/assets/icons';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const setLocaleCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
  };

  const changeLanguage = (locale: string) => {
    setLocaleCookie(locale);
    router.push(`/${locale}`);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 text-sm p-2 rounded hover:opacity-70 text-brand-purple'
      >
        <Language />
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded border border-neutral-200'>
          <ul className='space-y-1'>
            {Object.entries(t.raw('locales')).map(([key, value]: [key: string, value: string]) => (
              <li key={key}>
                <button
                  type='button'
                  onClick={() => changeLanguage(key)}
                  className={`block w-full text-left px-4 py-2 hover:bg-neutral-100 ${
                    key === locale ? 'bg-neutral-200' : ''
                  }`}
                >
                  <span className='text-black'>{value}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
