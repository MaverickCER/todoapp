'use client';

import { Language } from '@/assets/icons';

export function LanguageSelectorSkeleton() {
  return (
    <div className='relative'>
      <button
        type='button'
        disabled
        className='flex items-center space-x-2 text-sm p-2 rounded hover:opacity-70 text-brand-purple'
      >
        <Language />
      </button>
    </div>
  );
}

export default LanguageSelectorSkeleton;
