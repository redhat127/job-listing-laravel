import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { FileInput } from '@/components/file-input';
import { SubmitBtn } from '@/components/submit-btn';
import { useTurnstile } from '@/components/turnstil-provider';
import { FieldGroup } from '@/components/ui/field';
import { useAuth } from '@/hooks/use-auth';
import { setServerValidationErrors } from '@/lib/utils';
import { validImageTypes, validImageTypesErrorMessage } from '@/zod-schema/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const avatarSchema = z.object({
  avatar: z
    .instanceof(File, { error: 'avatar must be a file.' })
    .refine((file) => file.size > 0, {
      error: 'avatar cannot be empty.',
    })
    .refine((file) => file.size <= 1024 * 1024 * 2, {
      error: 'avatar must be smaller than 2mb.',
    })
    .refine((file) => validImageTypes.includes(file.type), {
      error: validImageTypesErrorMessage,
    }),
});

export const AvatarForm = () => {
  const auth = useAuth();
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = form;
  const [isPending, setIsPending] = useState(false);
  const turnstile = useTurnstile();
  const isFormDisabled = isSubmitting || isPending || !turnstile.isValid;
  return (
    <div className="max-w-lg">
      <form
        onSubmit={handleSubmit((data) => {
          if (!turnstile.skip_local && !turnstile.token) {
            return;
          }
          router.post(
            AccountController.avatar(),
            {
              ...data,
              'turnstile-token': turnstile.token,
            },
            {
              preserveScroll: true,
              preserveState: 'errors',
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
          <FileInput label="Avatar" name="avatar" control={control} imageAlt="Avatar Preview" />
          <div className="flex items-center gap-2">
            <SubmitBtn isDisabled={isFormDisabled} className="self-start">
              Save
            </SubmitBtn>
            {auth?.avatar && (
              <SubmitBtn form="delete-avatar-form" isDisabled={isFormDisabled} className="self-start" variant="destructive">
                Delete Current Avatar
              </SubmitBtn>
            )}
          </div>
        </FieldGroup>
      </form>
      {auth?.avatar && (
        <form
          id="delete-avatar-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!turnstile.skip_local && !turnstile.token) {
              return;
            }
            router.delete(AccountController.deleteAvatar(), {
              data: {
                'turnstile-token': turnstile.token,
              },
              preserveScroll: true,
              preserveState: 'errors',
              onBefore() {
                setIsPending(true);
              },
              onFinish() {
                setIsPending(false);
                turnstile.reset();
              },
            });
          }}
        />
      )}
    </div>
  );
};
