'use client';

import { Check, Plus } from '@/assets/icons';
import { withErrorBoundary } from '@/components/client';
import { BACKGROUND_CLASSES } from '@/contracts/tailwind.constants';
import { useTaskContext } from '@/hooks/useTaskContext';
import { TTask } from '@/libs/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useId, useMemo } from 'react';

export function TaskForm({ id }: { id?: number }) {
  const router = useRouter();
  const {
    taskContext: { tasks },
    setTaskContext,
  } = useTaskContext();
  const t = useTranslations('task-form');
  const titleId = useId();
  const task = useMemo(() => {
    const fallback = { title: '', color: 'red' };
    if (!id || !tasks) return fallback;
    return tasks.find((task) => task.id === id) || fallback;
  }, [tasks, id]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();

      // Parse form data and handle "true"/"false" conversion
      const formData = new FormData(e.target);
      const parsedData = Object.fromEntries(Array.from(formData.entries()));

      // Merge with profile data
      const data = {
        ...(task ?? {}),
        ...parsedData,
      };

      setTaskContext(data as TTask);
      router.push('/');
    },
    [task, router],
  );

  return (
    <form onSubmit={handleSubmit} action='javascript:void(0);'>
      <div>
        <label htmlFor={titleId} className='text-brand-bright mb-2 block'>
          {t('title')}
        </label>
        <input
          type='text'
          name='title'
          required
          defaultValue={task.title}
          placeholder={t('titlePlaceholder')}
          className='w-full bg-brand-soot border-brand-gray rounded p-3 mb-5'
        />
      </div>
      <div>
        <p className='text-brand-bright mb-2'>{t('color')}</p>
        <div className='flex flex-wrap space-x-3 items-center justify-start mb-5'>
          {['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink', 'brown'].map((color) => (
            <label
              key={color}
              className={`rounded-full w-10 h-10 hover:opacity-80 cursor-pointer ${BACKGROUND_CLASSES[color]}`}
            >
              <input
                type='radio'
                name='color'
                value={color}
                defaultChecked={color === task.color}
                title={t(color)}
                className='hidden'
              />
            </label>
          ))}
        </div>
      </div>
      <button type='submit' className='flex bg-brand text-sm font-bold w-full max-w-6xl justify-center p-3 rounded'>
        {id ? (
          <>
            {t('save')}&nbsp;
            <Check />
          </>
        ) : (
          <>
            {t('addtask')}&nbsp;
            <Plus />
          </>
        )}
      </button>
    </form>
  );
}

export default withErrorBoundary(TaskForm);
