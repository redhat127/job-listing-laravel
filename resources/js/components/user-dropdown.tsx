import type { User as IUser } from '@/types';
import { useMemo, useState } from 'react';
import { LogoutForm } from './form/logout-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

export const UserDropdown = ({ auth: { name, email, avatar } }: { auth: Pick<IUser, 'name' | 'email' | 'avatar'> }) => {
  const userInitials = useMemo(() => {
    return <UserAvatar name={name} avatar={avatar} />;
  }, [name, avatar]);
  const [open, setOpen] = useState(false);
  //   const closeDropdown = useCallback(() => {
  //     setOpen(false);
  //   }, []);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          {userInitials}
          <div className="flex max-w-30 flex-col">
            <span className="truncate">{name}</span>
            <span className="truncate text-sm font-normal text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* TODO: don't know how this goes yet! */}
        {/* <UserDropdownMenuItem href={home.url()} label="Favorite Jobs" icon={<Heart />} closeDropdown={closeDropdown} />
        <UserDropdownMenuItem href={home.url()} label="My Jobs" icon={<Layers />} closeDropdown={closeDropdown} /> */}
        <DropdownMenuItem className="p-0">
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// const UserDropdownMenuItem = ({ href, label, icon, closeDropdown }: { href: string; label: string; icon: ReactNode; closeDropdown(): void }) => {
//   return (
//     <DropdownMenuItem className="p-0">
//       <Link href={href} className="flex w-full items-center gap-1.5 px-2 py-1.5" onClick={closeDropdown}>
//         {icon}
//         {label}
//       </Link>
//     </DropdownMenuItem>
//   );
// };
