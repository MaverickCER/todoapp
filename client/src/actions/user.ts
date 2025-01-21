'use server';

import { logger } from '@/utils';
import { getServerSession } from 'next-auth';

export async function getServerUser() {
  return await logger.errorHandler(
    'user.getServerUser',
    async () => {
      const session = await getServerSession();
      return session ? session.user || null : null;
    },
    undefined,
    null,
    false,
  );
}

export default getServerUser;
