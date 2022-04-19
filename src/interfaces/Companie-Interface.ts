import { z } from 'zod';

export const CompanieInterface = z.object({
  CNPJ: z.string().length(14),
  name: z.string().max(200),
  password: z.string().min(6),
  users: z.array(z.object({ userId: z.string() })).optional(),
});

export type Companie = z.infer<typeof CompanieInterface>;

export interface CompanieAuthorization extends Companie {
  Authorization: string,
}

