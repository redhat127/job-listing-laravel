import RegisterController from '@/actions/App/Http/Controllers/RegisterController';
import { FieldGroup } from '@/components/ui/field';
import { setServerValidationErrors } from '@/lib/utils';
import { registerSchema } from '@/zod-schema/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { PasswordInput } from '../password-input';
import { SubmitBtn } from '../submit-btn';
import { TextInput } from '../text-input';
import { useTurnstile } from '../turnstil-provider';

export const RegisterForm = () => {
  const turnstile = useTurnstile();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = form;
  const [isPending, setIsPending] = useState(false);
  const isFormDisabled = isSubmitting || isPending || !turnstile.isValid;
  return (
    <form
      className="max-w-lg"
      onSubmit={handleSubmit((data) => {
        if (!turnstile.skip_local && !turnstile.token) {
          return;
        }
        router.post(
          RegisterController.post(),
          {
            ...data,
            'turnstile-token': turnstile.token,
          },
          {
            onBefore() {
              setIsPending(true);
            },
            onFinish() {
              setIsPending(false);
              turnstile.reset();
            },
            onError(errors) {
              setServerValidationErrors(errors, setError);
            },
          },
        );
      })}
    >
      <FieldGroup className="gap-4">
        <TextInput control={control} name="name" label="Name" />
        <TextInput control={control} name="email" label="Email" inputType="email" />
        <PasswordInput control={control} name="password" label="Password" />
        <SubmitBtn isDisabled={isFormDisabled}>Register</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
