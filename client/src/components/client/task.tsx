'use client';

import { Check, Delete, Warning } from '@/assets/icons';
import { BACKGROUND_CLASSES } from '@/contracts/tailwind.constants';
import { useTaskContext } from '@/hooks';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Dialog from './dialog';

export function Task({ task }) {
  const t = useTranslations('task');
  const { setTaskContext } = useTaskContext();
  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => setOpen((prev) => !prev), []);

  const handleComplete = useCallback(async () => {
    await setTaskContext({ ...task, completed: !task.completed });
  }, [task]);

  const handleDelete = useCallback(async () => {
    await setTaskContext(task.id);
  }, [task]);

  return (
    <>
      <li className={`flex space-x-3 bg-brand-soot border-gray bg-brand-soot border-1 border-solid rounded my-3`}>
        <div className='flex'>
          <div className={BACKGROUND_CLASSES[task.color || 'none'] + ' w-1 min-h-full'} />
          <button
            type='button'
            onClick={handleComplete}
            title={task.completed ? t('markincomplete') : t('markcomplete')}
            className='w-10 h-10 flex items-center justify-center rounded-full hover:opacity-50'
          >
            <div
              className={
                'w-5 h-5 flex items-center justify-center rounded-full svg-wrapper ' +
                (task.completed ? 'bg-brand-purple' : 'border-2 border-brand')
              }
            >
              {task.completed ? <Check /> : ' '}
            </div>
          </button>
        </div>
        <Link
          href={'/edit/' + task.id}
          className={`w-full flex items-center text-left ${task.completed ? 'opacity-70' : ''}`}
          title={t('edit')}
        >
          {task.completed ? <del>{task.title}</del> : task.title}
        </Link>
        <div className='flex'>
          <button
            type='button'
            onClick={toggleDialog}
            title={t('delete')}
            className='w-10 h-10 flex items-center justify-center rounded-full hover:opacity-50'
          >
            <Delete />
          </button>
          <div className={BACKGROUND_CLASSES[task.color || 'none'] + ' w-1 min-h-full'} />
        </div>
      </li>
      <Dialog open={open} onClose={toggleDialog}>
        <div className='flex space-x-3'>
          <span className='text-brand-red'>
            <div className='p-3 bg-brand-redish rounded-full'>
              <Warning />
            </div>
          </span>
          <span>
            <p className='text-lg font-semibold mb-3'>{t('confirm')}</p>
            <p>{t('undoimpossible')}</p>
            <div className='flex justify-end space-x-3 -mb-6'>
              <button type='button' className='p-3 hover:opacity-70' onClick={toggleDialog}>
                {t('cancel')}
              </button>
              <button type='button' className='p-3 hover:opacity-70' onClick={handleDelete}>
                {t('delete')}
              </button>
            </div>
          </span>
        </div>
      </Dialog>
    </>
  );
}

export default Task;
