import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { component } = usePage();
  let title = '';
  let description = '';
  switch (component) {
    case 'login':
      title = 'Login';
      description = 'Use your email and password to login';
      break;
    case 'register':
      title = 'Register';
      description = 'Fill inputs below to register';
      break;
  }
  return (
    <div className="mx-auto mt-8 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold">{title}</h1>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
          <div className="mt-2">
            <Button asChild variant="outline" className="w-full">
              <Link href={home()}>
                <ArrowRight />
                Back to home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
