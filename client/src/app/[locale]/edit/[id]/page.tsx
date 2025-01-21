import { getServerUser } from '@/actions';
import { Back } from '@/assets/icons';
import { DynamicTaskForm } from '@/components/client';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Page({ params }: PageProps) {
  const user = await getServerUser();
  const t = await getTranslations('create');
  const id = Number((await params)?.id || '0');

  if (!user) {
    return <></>;
  }

  return (
    <article>
      <Link href='/' title={t('back')} className='m-backbutton block'>
        <Back />
      </Link>
      <DynamicTaskForm id={id} />
    </article>
  );
}
