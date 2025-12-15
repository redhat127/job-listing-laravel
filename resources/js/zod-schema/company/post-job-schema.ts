import z from 'zod';

export const jobTypes = [
  {
    label: 'Full Time',
    value: 'full-time',
  },
  {
    label: 'Part Time',
    value: 'part-time',
  },
  {
    label: 'Contract',
    value: 'contract',
  },
  {
    label: 'Freelance',
    value: 'freelance',
  },
  {
    label: 'Internship',
    value: 'internship',
  },
] as const;

export const experienceLevels = [
  { label: 'Entry', value: 'entry' },
  { label: 'Mid', value: 'mid' },
  { label: 'Senior', value: 'senior' },
  { label: 'Lead', value: 'lead' },
  { label: 'Executive', value: 'executive' },
] as const;

export const jobStatus = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Expired', value: 'expired' },
] as const;

const optionalString = (minLength: number, maxLength: number, fieldName: string) =>
  z
    .string()
    .trim()
    .refine((val) => val.length === 0 || val.length >= minLength, {
      message: `minimum ${minLength} characters is required if provided.`,
    })
    .max(maxLength, `${fieldName} is too long.`);

export const postJobSchema = z.object({
  title: z.string().trim().min(3, 'minimum 3 characters is required.').max(100, 'title is too long'),
  requirements: optionalString(10, 5000, 'requirements'),
  responsibilities: optionalString(10, 5000, 'responsibilities'),
  location: z.string().trim().min(2, 'location must be at least 2 characters.').max(500, 'location is too long.'),
  city: optionalString(3, 50, 'city'),
  state: optionalString(3, 50, 'state'),
  country: optionalString(2, 50, 'country'),
  is_remote: z.boolean(),
  job_type: z.literal(
    jobTypes.map((j) => j.value),
    {
      error: 'job type is invalid.',
    },
  ),
  experience_level: z.literal(
    experienceLevels.map((e) => e.value),
    {
      error: 'experience level is invalid.',
    },
  ),
  salary: optionalString(3, 50, 'salary'),
  show_salary: z.boolean(),
  skills: optionalString(10, 5000, 'skills'),
  benefits: optionalString(10, 5000, 'benefits'),
  status: z.literal(
    jobStatus.map((j) => j.value),
    {
      error: 'status is invalid.',
    },
  ),
});
