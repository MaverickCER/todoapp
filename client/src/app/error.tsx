'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Page() {
  const t = useTranslations('error');

  return (
    <div>
      <h2>{t('internal_server_error')}</h2>
      <p>{t('failed_to_load')}</p>
      <Link href={`/`}>{t('return_home')}</Link>
    </div>
  );
}
