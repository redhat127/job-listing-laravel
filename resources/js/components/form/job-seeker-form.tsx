import JobSeekerController from '@/actions/App/Http/Controllers/JobSeekerController';
import { FieldGroup } from '@/components/ui/field';
import { setServerValidationErrors } from '@/lib/utils';
import { jobSeekerSchema } from '@/zod-schema/job-seeker-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { FileInput } from '../file-input';
import { SubmitBtn } from '../submit-btn';
import { Textbox } from '../textbox';
import { useTurnstile } from '../turnstil-provider';

export const JobSeekerForm = () => {
  const turnstile = useTurnstile();
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      about: '',
      resume: undefined,
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
      onSubmit={handleSubmit((data) => {
        if (!turnstile.skip_local && !turnstile.token) {
          return;
        }
        router.post(
          JobSeekerController.post(),
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
        <Textbox control={control} name="about" label="About" className="min-h-32" />
        <FileInput control={control} name="resume" label="Resume" isImage={false} />
        <SubmitBtn isDisabled={isFormDisabled}>Create</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
