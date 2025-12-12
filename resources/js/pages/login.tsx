import { LoginForm } from '@/components/form/login-form';
import { AuthLayout } from '@/components/layout/auth';
import { BaseLayout } from '@/components/layout/base';
import { Button } from '@/components/ui/button';
import register from '@/routes/register';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Login() {
  return (
    <>
      <LoginForm />
      <Button variant="link" className="mt-2 px-0 underline underline-offset-4">
        <Link href={register.get()}>Create an account</Link>
      </Button>
    </>
  );
}

Login.layout = (page: ReactNode) => (
  <BaseLayout head={{ title: 'Login' }}>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
