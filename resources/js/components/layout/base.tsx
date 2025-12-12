import { useAuth } from '@/hooks/use-auth';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { generateTitle } from '@/lib/utils';
import { home } from '@/routes';
import login from '@/routes/login';
import { Head, Link } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Toaster } from '../ui/sonner';

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
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b bg-white p-4 px-8">
        <Link href={home()} className="flex items-center gap-1.5 text-xl font-bold text-sky-600 xs:text-2xl">
          <BriefcaseBusiness className="size-5 xs:size-auto" />
          Job <span className="text-black">Listing</span>
        </Link>
        {!auth && (
          <Button asChild>
            <Link href={login.get()}>Login</Link>
          </Button>
        )}
      </header>
      <main className="h-full px-8 pt-20 pb-10">
        {children}
        <Toaster expand position="top-center" closeButton />
      </main>
    </>
  );
};
