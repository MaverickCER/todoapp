'use client';

import { useTaskContext } from '@/hooks';
import ScrollToTopButton from './scroll-to-top-button';
import Task from './task';

export function List({ children }) {
  const {
    taskContext: { tasks },
  } = useTaskContext();

  if (!tasks || !tasks.length) {
    return <>{children}</>;
  }

  return (
    <>
      <ul style={{ marginTop: '24px' }}>
        {(tasks || []).map((task, index) => (
          <Task key={`${task.title}${index}`} task={task} />
        ))}
      </ul>
      <ScrollToTopButton />
    </>
  );
}

export default List;
