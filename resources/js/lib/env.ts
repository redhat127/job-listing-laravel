import z from 'zod';

export const clientEvn = z
  .object({
    VITE_APP_NAME: z.string().trim().min(1),
    VITE_TURNSTILE_SITE_KEY: z.string().trim().optional().nullable(),
    VITE_TURNSTILE_SKIP_LOCAL: z.string().trim().min(1),
  })
  .refine(
    (data) => {
      if (data.VITE_TURNSTILE_SKIP_LOCAL === 'true') {
        return true;
      }
      return !!data.VITE_TURNSTILE_SITE_KEY && data.VITE_TURNSTILE_SITE_KEY.length > 0;
    },
    {
      message: 'VITE_TURNSTILE_SITE_KEY is required when VITE_TURNSTILE_SKIP_LOCAL is not true',
      path: ['VITE_TURNSTILE_SITE_KEY'],
    },
  )
  .parse(import.meta.env);
