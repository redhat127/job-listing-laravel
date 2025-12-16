import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { FieldGroup } from '@/components/ui/field';
import { useAuth } from '@/hooks/use-auth';
import { setServerValidationErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const rules = (field: string, min = 1) =>
  z.string().trim().min(min, `minimum characters for ${field} is ${min}.`).max(50, `${field} name is too long.`);

const profileDetailsSchema = z.object({
  name: rules('name').regex(/^[A-Za-z0-9 _-]+$/, {
    error: 'only letters, numbers, underscores, hyphens and spaces are allowed.',
  }),
  username: rules('username', 6).regex(/^[A-Za-z0-9_-]+$/, {
    error: 'only letters, numbers, underscores and hyphens are allowed.',
  }),
});

export const ProfileDetailsForm = () => {
  const { name, username } = useAuth()!;
  const form = useForm<z.infer<typeof profileDetailsSchema>>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name,
      username,
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
        router.post(AccountController.profileDetails(), data, {
          preserveScroll: true,
          preserveState: 'errors',
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
        <TextInput label="Name" control={control} name="name" />
        <TextInput label="Username" control={control} name="username" />
        <SubmitBtn isDisabled={isFormDisabled} className="self-start">
          Update
        </SubmitBtn>
      </FieldGroup>
    </form>
  );
};
