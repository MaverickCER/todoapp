import { Plus } from '@/assets/icons';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function CreateTask() {
  const t = await getTranslations('createtask');

  return (
    <Link
      href='/create'
      className='w-full rounded bg-brand text-sm font-bold m-auto flex items-center justify-center p-3 -mt-9 mb-9'
    >
      {t('createtask')}
      &nbsp;
      <Plus />
    </Link>
  );
}

export default CreateTask;
