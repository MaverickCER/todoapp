'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAnonyousSignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (['authenticated', 'loading'].includes(status)) return;
    signIn('credentials', { redirect: true, name: 'Anonymous Profile' });
  }, [session, status, router]);

  return null;
}

export default useAnonyousSignIn;
