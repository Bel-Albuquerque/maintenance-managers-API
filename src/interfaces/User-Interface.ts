import { z } from 'zod';

export const UsersInterface = z.object({
  cpf: z.string().length(11),
  name: z.string().min(3),
  email: z.string().email(),
  fone: z.string().min(9),
  password: z.string().min(6),
});

export type User = z.infer<typeof UsersInterface>;
