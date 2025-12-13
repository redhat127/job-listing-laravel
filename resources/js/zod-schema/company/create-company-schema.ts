import z from 'zod';
import { validImageTypes, validImageTypesErrorMessage } from '../utils';

export const createCompanySchema = z.object({
  name: z.string().trim().min(3, 'name must be at least 3 characters.').max(100, 'name is too long.'),
  location: z.string().trim().min(2, 'location must be at least 2 characters.').max(500, 'location is too long.'),
  about: z.string().trim().min(10, 'about must be at least 10 characters.').max(1000, 'about is too long.'),
  logo: z
    .instanceof(File, { error: 'logo must be a file.' })
    .refine((file) => file.size > 0, {
      error: 'logo cannot be empty.',
    })
    .refine((file) => file.size <= 1024 * 1024 * 2, {
      error: 'logo must be smaller than 2mb.',
    })
    .refine((file) => validImageTypes.includes(file.type), {
      error: validImageTypesErrorMessage,
    })
    .optional(),
  website: z
    .string()
    .trim()
    .max(255, 'website is too long.')
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: 'valid url is required.',
    }),
  xAccount: z
    .string()
    .trim()
    .max(255, 'xAccount is too long.')
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: 'valid url is required.',
    }),
});
