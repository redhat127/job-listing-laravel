import CompanyController from '@/actions/App/Http/Controllers/CompanyController';
import { CheckboxInput } from '@/components/checkbox';
import { RadioGroupInput } from '@/components/radio-group-input';
import { SubmitBtn } from '@/components/submit-btn';
import { TextInput } from '@/components/text-input';
import { Textbox } from '@/components/textbox';
import { useTurnstile } from '@/components/turnstil-provider';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { setServerValidationErrors } from '@/lib/utils';
import company from '@/routes/company';
import { experienceLevels, jobStatus, jobTypes, postJobSchema } from '@/zod-schema/company/post-job-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';

export const PostJobForm = () => {
  const turnstile = useTurnstile();
  const form = useForm<z.infer<typeof postJobSchema>>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: '',
      requirements: '',
      responsibilities: '',
      location: '',
      city: '',
      state: '',
      country: '',
      is_remote: false,
      job_type: 'full-time',
      experience_level: 'entry',
      salary: '',
      show_salary: false,
      skills: '',
      benefits: '',
      status: 'draft',
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
          CompanyController.jobStore(),
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
        <TextInput control={control} name="title" label="Title" />
        <Textbox control={control} name="requirements" label="Requirements" className="min-h-32" />
        <Textbox control={control} name="responsibilities" label="Responsibilities" className="min-h-32" />
        <TextInput control={control} name="location" label="Location" />
        <TextInput control={control} name="city" label="City" />
        <TextInput control={control} name="state" label="State" />
        <TextInput control={control} name="country" label="Country" />
        <CheckboxInput control={control} name="is_remote" label="Is Remote?" />
        <RadioGroupInput control={control} name="job_type" label="Job Type" items={jobTypes} />
        <RadioGroupInput control={control} name="experience_level" label="Experience Level" items={experienceLevels} />
        <TextInput control={control} name="salary" label="Salary" />
        <CheckboxInput control={control} name="show_salary" label="Show Salary?" />
        <Textbox control={control} name="skills" label="Skills" className="min-h-32" />
        <Textbox control={control} name="benefits" label="Benefits" className="min-h-32" />
        <RadioGroupInput control={control} name="status" label="Status" items={jobStatus} />
        <div className="flex items-center gap-2">
          <SubmitBtn isDisabled={isFormDisabled} className="self-start">
            Create
          </SubmitBtn>
          <Button asChild variant="outline">
            <Link href={company.myCompany()}>Cancel</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
