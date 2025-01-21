'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const URLSP = new URLSearchParams(searchParams).toString();

  useEffect(() => {
    sessionStorage.setItem('searchParams', URLSP);
    signIn(undefined, { callbackUrl: '/' });
  }, [URLSP]);

  return null;
}
