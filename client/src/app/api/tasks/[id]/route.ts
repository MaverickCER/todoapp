import { profileRepository } from '@/libs/prisma';
import { deleteTask, putTask } from '@/services/core';
import { logger } from '@/utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return await logger.errorHandler(
    'tasks.id.put',
    async (req) => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const profile = await profileRepository.findUnique({ email: sessionEmail });
      if (!profile || !profile.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
      const json = await req.json();

      const task = await putTask({
        data: { ...json, id: Number((req.url || '').split('/').pop()) },
        profileId: Number(profile.id),
      });

      return NextResponse.json(task, { status: 200 });
    },
    req,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}

export async function DELETE(req: NextRequest) {
  return await logger.errorHandler(
    'tasks.id.delete',
    async (req) => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';
      const profile = await profileRepository.findUnique({ email: sessionEmail });
      if (!profile || !profile.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      const task = await deleteTask({ id: Number((req.url || '').split('/').pop()), profileId: Number(profile.id) });

      return NextResponse.json(task, { status: 200 });
    },
    req,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}
