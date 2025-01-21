import { config } from '@/contracts/config.constants';
import { TTask } from '@/libs/zod';
import { logger, stringify } from '@/utils';

type TGetTasks = {
  profileId: number;
};
export async function getTasks({ profileId }: TGetTasks) {
  return logger.errorHandler(
    'core.getTasks',
    async ({ profileId }) => {
      const response = await fetch(`${config.CORE_URL}/tasks?profileId=${profileId}`);
      return await response.json();
    },
    { profileId },
    [],
  );
}

type TPostTasks = {
  profileId: number;
  data: TTask;
};
export async function postTasks({ data, profileId }: TPostTasks) {
  return logger.errorHandler(
    'core.postTasks',
    async ({ data, profileId }) => {
      const response = await fetch(`${config.CORE_URL}/tasks?profileId=${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringify(data),
      });
      return await response.json();
    },
    { data, profileId },
    [],
  );
}

type TDeleteTask = {
  profileId: number;
  id: number;
};
export async function deleteTask({ id, profileId }: TDeleteTask) {
  return logger.errorHandler(
    'core.deleteTask',
    async ({ id, profileId }) => {
      const response = await fetch(`${config.CORE_URL}/tasks/${id}?profileId=${profileId}`, {
        method: 'DELETE',
      });
      return await response.json();
    },
    { id, profileId },
    'message',
  );
}

type TPutTask = {
  profileId: number;
  data: TTask;
};
export async function putTask({ data, profileId }: TPutTask) {
  return logger.errorHandler(
    'core.putTask',
    async ({ data, profileId }) => {
      const response = await fetch(`${config.CORE_URL}/tasks/${data.id}?profileId=${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringify(data),
      });
      return await response.json();
    },
    { data, profileId },
    [],
  );
}
