'use client';

import { useTaskContext } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export function Info() {
  const t = useTranslations('info');
  const {
    taskContext: { tasks },
  } = useTaskContext();
  const totalTasks = useMemo(() => tasks?.length || 0, [tasks]);
  const completedTasks = useMemo(() => tasks?.filter((task) => task.completed)?.length || 0, [tasks]);

  return (
    <div className='flex justify-between items-center w-full'>
      <span className='flex items-center text-brand-bright'>
        {t('tasks')}&nbsp;
        <div className='bg-brand-soot rounded-full text-white px-3 justify-center items-center'>{totalTasks}</div>
      </span>
      <span className='flex items-center text-brand-purple'>
        {t('completed')}&nbsp;
        <div className='bg-brand-soot rounded-full text-white px-3 justify-center items-center'>
          {completedTasks}
          {t('of')}
          {totalTasks}
        </div>
      </span>
    </div>
  );
}

export default Info;
