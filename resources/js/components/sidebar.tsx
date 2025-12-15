import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Home, PencilLine } from 'lucide-react';
import { useLayoutEffect, useState, type ReactNode } from 'react';
import { Button } from './ui/button';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sidebarTop, setSidebarTop] = useState(0);
  useLayoutEffect(() => {
    const header = document.querySelector<HTMLDivElement>('header');
    if (!header) return;
    const updateSidebarTop = () => {
      const { bottom } = header.getBoundingClientRect();
      setSidebarTop(bottom);
    };
    updateSidebarTop();
    const resizeObserver = new ResizeObserver(() => {
      updateSidebarTop();
    });
    resizeObserver.observe(header);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      className={cn('fixed left-0 z-50 flex h-full flex-col items-center gap-4 border-r bg-white p-4', {
        'w-18': isCollapsed,
        'w-64': !isCollapsed,
      })}
      style={{
        top: sidebarTop,
      }}
    >
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => {
          setIsCollapsed((prev) => !prev);
        }}
        title="Open Sidebar"
        className={cn({
          'ml-auto': !isCollapsed,
        })}
      >
        {isCollapsed ? <ArrowRight /> : <ArrowLeft />}
      </Button>
      <SidebarMenus isCollapsed={isCollapsed} />
    </div>
  );
};

const SidebarMenus = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const auth = useAuth();
  const isUserTypeCompany = auth && auth.onboarding_completed && auth.user_type === 'company';
  return (
    <div className="scrollbar-none max-h-screen flex-1 overflow-auto pb-16">
      {isCollapsed && (
        <ul className="flex flex-col gap-2">
          <SidebarCollapsedMenuItem title="Home" icon={<Home />} href={home.url()} />
          {isUserTypeCompany && <SidebarCollapsedMenuItem title="Post a Job" icon={<PencilLine />} href={home.url()} />}
        </ul>
      )}
    </div>
  );
};

const SidebarCollapsedMenuItem = ({ title, icon, href }: { title: string; icon: ReactNode; href: string }) => {
  return (
    <li>
      <Button asChild variant="outline" size="icon-sm" title={title}>
        <Link href={href}>{icon}</Link>
      </Button>
    </li>
  );
};
