import { z } from 'zod';

export const addPostSchema = z.object({
  description: z.string().max(500)
});

export type AddPostDescription = z.infer<typeof addPostSchema>;
