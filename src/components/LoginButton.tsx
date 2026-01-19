'use client';

import { Button } from '@whop/react/components';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <Button onClick={() => signIn('whop')} variant="classic">
      Sign in with Whop
    </Button>
  );
}
