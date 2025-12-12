import z from 'zod';

export const clientEvn = z
  .object({
    VITE_APP_NAME: z.string().trim().min(1),
  })
  .parse(import.meta.env);
