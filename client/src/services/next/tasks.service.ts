import { TTask } from '@/libs/zod';
import { logger, stringify } from '@/utils';

type GetTasks = {
  signal: AbortSignal;
};
export async function getTasks({ signal }: GetTasks) {
  return logger.errorHandler(
    'next.getTasks',
    async (signal) => {
      const response = await fetch('/api/tasks', { signal });
      return await response.json();
    },
    signal,
    [],
  );
}

type PostTasks = {
  data: TTask;
  signal: AbortSignal;
};
export async function postTasks({ data, signal }: PostTasks) {
  return logger.errorHandler(
    'next.postTasks',
    async ({ data, signal }) => {
      const response = await fetch('/api/tasks', {
        signal,
        method: 'POST',
        body: stringify(data),
      });
      return await response.json();
    },
    { data, signal },
    [],
  );
}

type DeleteTask = {
  id: number;
  signal: AbortSignal;
};
export async function deleteTask({ id, signal }: DeleteTask) {
  return logger.errorHandler(
    'next.deleteTask',
    async ({ id, signal }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        signal,
        method: 'DELETE',
      });
      return await response.json();
    },
    { id, signal },
    'message',
  );
}

type PutTask = {
  data: TTask;
  signal: AbortSignal;
};
export async function putTask({ data, signal }: PutTask) {
  return logger.errorHandler(
    'next.putTask',
    async ({ data, signal }) => {
      const response = await fetch(`/api/tasks/${data.id}`, {
        signal,
        method: 'PUT',
        body: stringify(data),
      });
      return await response.json();
    },
    { data, signal },
    [],
  );
}
