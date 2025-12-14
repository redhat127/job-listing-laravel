import CompanyController from '@/actions/App/Http/Controllers/CompanyController';
import { FileInput } from '@/components/file-input';
import { useTurnstile } from '@/components/turnstil-provider';
import { FieldGroup } from '@/components/ui/field';
import { setServerValidationErrors } from '@/lib/utils';
import { createCompanySchema } from '@/zod-schema/company/create-company-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SubmitBtn } from '../../submit-btn';
import { TextInput } from '../../text-input';
import { Textbox } from '../../textbox';

export const CreateCompanyForm = () => {
  const turnstile = useTurnstile();
  const form = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      location: '',
      about: '',
      logo: undefined,
      website: '',
      xAccount: '',
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
          CompanyController.store(),
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
        <Textbox control={control} name="location" label="Location" />
        <Textbox control={control} name="about" label="About" className="min-h-32" />
        <FileInput control={control} name="logo" label="Logo" imageAlt="logo preview" imagePreviewClass="h-20 w-20" />
        <TextInput control={control} name="website" label="Website" inputType="url" />
        <TextInput control={control} name="xAccount" label="X Account" inputType="url" />
        <SubmitBtn isDisabled={isFormDisabled}>Create</SubmitBtn>
      </FieldGroup>
    </form>
  );
};
