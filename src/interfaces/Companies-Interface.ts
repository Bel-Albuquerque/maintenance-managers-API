import { z } from 'zod';

export const CompaniesInterface = z.object({
  CNPJ: z.string().length(14),
  name: z.string().max(200),
  userRegistrationKey: z.string().min(6),
  password: z.string().min(6),
});

export type Companie = z.infer<typeof CompaniesInterface>;
