import LogoutController from '@/actions/App/Http/Controllers/LogoutController';
import { router } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';
import { SubmitBtn } from '../submit-btn';

export const LogoutForm = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        router.post(LogoutController.post(), undefined, {
          onBefore() {
            setIsFormDisabled(true);
          },
          onFinish() {
            setIsFormDisabled(false);
          },
        });
      }}
    >
      <SubmitBtn isDisabled={isFormDisabled} className="flex w-full items-center gap-1.5 px-2 py-1.5 text-red-600" buttonComponent={false}>
        <LogOutIcon className="text-inherit" />
        Logout
      </SubmitBtn>
    </form>
  );
};
