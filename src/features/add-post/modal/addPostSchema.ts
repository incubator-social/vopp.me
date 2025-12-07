import { z } from 'zod';

export const addPostSchema = z.object({
  description: z.string().max(500)
});

export type AddPostDescriptionValue = z.infer<typeof addPostSchema>;
