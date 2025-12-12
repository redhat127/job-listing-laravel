import { RegisterForm } from '@/components/form/register-form';
import { AuthLayout } from '@/components/layout/auth';
import { BaseLayout } from '@/components/layout/base';
import { Button } from '@/components/ui/button';
import login from '@/routes/login';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Register() {
  return (
    <>
      <RegisterForm />
      <Button variant="link" className="mt-2 px-0 underline underline-offset-4">
        <Link href={login.get()}>Back to login</Link>
      </Button>
    </>
  );
}

Register.layout = (page: ReactNode) => (
  <BaseLayout head={{ title: 'Register' }}>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
