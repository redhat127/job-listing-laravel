import { LoginForm } from '@/components/form/login-form';
import { AuthLayout } from '@/components/layout/auth';
import { BaseLayout } from '@/components/layout/base';
import { useTurnstile } from '@/components/turnstil-provider';
import { Button } from '@/components/ui/button';
import { GitHub } from '@/icons/github';
import { Google } from '@/icons/google';
import login from '@/routes/login';
import register from '@/routes/register';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Login() {
  const turnstile = useTurnstile();
  return (
    <>
      <LoginForm />
      <Button variant="link" className="mt-2 px-0 underline underline-offset-4">
        <Link href={register.get()}>Create an account</Link>
      </Button>
      <div className="mt-2 space-y-2">
        <Button className="w-full" disabled={!turnstile.isValid}>
          <a href={login.provider.redirect.url({ provider: 'github' })} className="flex items-center gap-1.5">
            <GitHub />
            Continue with Github
          </a>
        </Button>
        <Button className="w-full" disabled={!turnstile.isValid}>
          <a href={login.provider.redirect.url({ provider: 'google' })} className="flex items-center gap-1.5">
            <Google />
            Continue with Google
          </a>
        </Button>
      </div>
    </>
  );
}

Login.layout = (page: ReactNode) => (
  <BaseLayout head={{ title: 'Login' }}>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
