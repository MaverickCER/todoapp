import { getServerUser } from '@/actions';
import { Back } from '@/assets/icons';
import { DynamicTaskForm } from '@/components/client';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Page() {
  const user = await getServerUser();
  const t = await getTranslations('create');

  if (!user) {
    return <></>;
  }

  return (
    <article>
      <Link href='/' title={t('back')} className='m-backbutton block'>
        <Back />
      </Link>
      <DynamicTaskForm />
    </article>
  );
}
