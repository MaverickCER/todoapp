import { profileRepository } from '@/libs/prisma';
import { logger } from '@/utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  return await logger.errorHandler(
    'profile.get',
    async () => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';

      const profile = await profileRepository.findUnique({ email: sessionEmail });

      if (!profile || !profile.is_active || (profile.banned_until && new Date(profile.banned_until) > new Date())) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 });
      }

      return NextResponse.json(profile, { status: 200 });
    },
    undefined,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}

export async function PATCH(req: NextRequest) {
  return await logger.errorHandler(
    'profile.patch',
    async (req) => {
      const session = await getServerSession();
      const sessionEmail = (session && session.user && session.user.email) || '';

      const profile = await profileRepository.findUnique({ email: sessionEmail });

      if (!profile || !profile.is_active || (profile.banned_until && new Date(profile.banned_until) > new Date())) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 });
      }

      const data = await req.json();
      const updatedProfile = await profileRepository.update(profile, data);

      return NextResponse.json(updatedProfile, { status: 200 });
    },
    req,
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    false,
  );
}
