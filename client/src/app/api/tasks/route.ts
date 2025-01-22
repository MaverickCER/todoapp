import { profileRepository } from '@/libs/prisma';
import { deleteTask, getTasks, postTasks } from '@/services/core';
import { logger } from '@/utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  return await logger.errorHandler(
    'tasks.get',
    async () => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const profile = await profileRepository.findUnique({ email: sessionEmail });
      if (!profile || !profile.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      const tasks = await getTasks({ profileId: Number(profile.id) });

      return NextResponse.json(tasks, { status: 200 });
    },
    undefined,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}

export async function POST(req: NextRequest) {
  return await logger.errorHandler(
    'tasks.post',
    async (req) => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const profile = await profileRepository.findUnique({ email: sessionEmail });
      console.error({ profile, session });
      if (!profile || !profile.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      const data = await req.json();

      const task = await postTasks({ data, profileId: Number(profile.id) });

      return NextResponse.json(task, { status: 200 });
    },
    req,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}

export async function DELETE() {
  return await logger.errorHandler(
    'tasks.get',
    async () => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const profile = await profileRepository.findUnique({ email: sessionEmail });
      if (!profile || !profile.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      const tasks = await deleteTask({ id: 0, profileId: Number(profile.id) });

      return NextResponse.json({ tasks }, { status: 200 });
    },
    undefined,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}
