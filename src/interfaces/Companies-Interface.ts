import { z } from 'zod';

export const CompaniesInterface = z.object({
  CNPJ: z.string().length(14),
  Name: z.string().max(200),
  usersKey: z.string().min(6),
  password: z.string().min(6),
});

export type Companies = z.infer<typeof CompaniesInterface>;
