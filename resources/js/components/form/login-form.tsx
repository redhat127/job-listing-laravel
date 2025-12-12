import LoginController from '@/actions/App/Http/Controllers/LoginController';
import { FieldGroup } from '@/components/ui/field';
import { setServerValidationErrors } from '@/lib/utils';
import { loginSchema } from '@/zod-schema/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CheckboxInput } from '../checkbox';
import { PasswordInput } from '../password-input';
import { SubmitBtn } from '../submit-btn';
import { TextInput } from '../text-input';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending;
  return (
    <form
      className="max-w-lg"
      onSubmit={handleSubmit((data) => {
        router.post(LoginController.post(), data, {
          onBefore() {
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onError(errors) {
            setServerValidationErrors(errors, setError);
          },
        });
      })}
    >
      <FieldGroup className="gap-4">
        <TextInput control={control} name="email" label="Email" inputType="email" />
        <PasswordInput control={control} name="password" label="Password" />
        <CheckboxInput control={control} name="remember_me" label="Remember me?" />
        <SubmitBtn isDisabled={isFormDisabled}>Login</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
