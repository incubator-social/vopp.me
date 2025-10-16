import { z } from 'zod';

// 📌 схема для изображения
const PostImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  fileSize: z.number(),
  createdAt: z.string().datetime(),
  uploadId: z.string()
});

// 📌 схема для владельца
const PostOwnerSchema = z.object({
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional()
});

// 📌 схема для поста
export const PostSchema = z.object({
  id: z.number(),
  userName: z.string(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  images: z.array(PostImageSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  avatarOwner: z.string().url().nullable(),
  ownerId: z.number(),
  owner: PostOwnerSchema,
  likesCount: z.number(),
  isLiked: z.boolean(),
  avatarWhoLikes: z.array(z.unknown()) // уточнить структуру
});

// 📌 схема ответа от API
export const PostsResponseSchema = z.object({
  totalCount: z.number(),
  pageSize: z.number(),
  items: z.array(PostSchema),
  totalUsers: z.number()
});

// 📌 типы на основе схем
export type Post = z.infer<typeof PostSchema>;
export type PostsResponse = z.infer<typeof PostsResponseSchema>;
