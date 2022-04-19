import { z } from 'zod';

export const UsersInterface = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  fone: z.string().min(9),
  companieCNPJ: z.string().length(14),
  userRegistrationKey:z.string().min(6),
  password: z.string().min(6),
});

export type User = z.infer<typeof UsersInterface>;
