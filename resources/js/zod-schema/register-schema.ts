import z from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'name must be at least 3 characters.')
    .max(50, 'name is too long.')
    .regex(/^[a-zA-Z0-9\-_ ]+$/, 'name can only contain english letters, numbers, spaces, hyphens and underscores.'),
  email: z.email('valid email is required').max(50, 'email is too long.'),
  password: z.string().min(10, 'password must be at least 10 characters.').max(50, 'password is too long.'),
});
