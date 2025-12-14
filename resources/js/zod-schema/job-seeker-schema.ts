import z from 'zod';

export const jobSeekerSchema = z.object({
  about: z.string().trim().min(10, 'about must be at least 10 characters.').max(1000, 'about is too long.'),
  resume: z
    .instanceof(File, { error: 'resume must be a file.' })
    .refine((file) => file.size > 0, {
      error: 'resume cannot be empty.',
    })
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      error: 'resume must be smaller than 5mb.',
    })
    .refine((file) => file.type === 'application/pdf', {
      error: 'resume must be a pdf file.',
    }),
});
