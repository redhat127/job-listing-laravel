import { useAuth } from '@/hooks/use-auth';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { clientEvn } from '@/lib/env';
import { generateTitle } from '@/lib/utils';
import { home } from '@/routes';
import login from '@/routes/login';
import { Head, Link } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Sidebar } from '../sidebar';
import { ToggleTheme } from '../toggle-theme';
import { Button } from '../ui/button';
import { Toaster } from '../ui/sonner';
import { UserDropdown } from '../user-dropdown';

export const BaseLayout = ({ head, children }: { head?: { title?: string; children?: ReactNode }; children: ReactNode }) => {
  if (head?.title) {
    head.title = generateTitle(head.title);
  }
  const flashMessage = useFlashMessage();
  useEffect(() => {
    if (flashMessage) {
      toast[flashMessage.type](flashMessage.text);
    }
  }, [flashMessage]);
  const auth = useAuth();
  return (
    <>
      {head && <Head {...head} />}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b bg-white p-4 px-8 dark:bg-black">
        <Link href={home()} className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-500">
          <BriefcaseBusiness className="hidden 2xs:inline-block" />
          <div className="text-2xl">{clientEvn.VITE_APP_NAME}</div>
        </Link>
        <div className="flex items-center gap-2">
          {!auth ? (
            <Button asChild className="hidden 2xs:inline-block">
              <Link href={login.get()}>Login</Link>
            </Button>
          ) : (
            <UserDropdown auth={auth} />
          )}
          <ToggleTheme />
        </div>
      </header>
      <Sidebar />
      <main className="ml-16 min-h-full px-8 pt-20 pb-10">
        {children}
        <Toaster expand position="top-center" closeButton />
      </main>
    </>
  );
};
