import type { User as IUser } from '@/types';
import { useMemo } from 'react';
import { LogoutForm } from './form/logout-form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

export const UserDropdown = ({ auth: { name, email, avatar } }: { auth: IUser }) => {
  const userInitials = useMemo(() => {
    return <UserAvatar name={name} avatar={avatar} />;
  }, [name, avatar]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          {userInitials}
          <div className="flex max-w-30 flex-col">
            <span className="truncate">{name}</span>
            <span className="truncate text-sm font-normal text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
