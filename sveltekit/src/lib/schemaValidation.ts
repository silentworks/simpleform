import * as z from 'zod';

export const PostSchema = z.object({
  title: z.string().min(2, "Title is required").max(100),
  content: z.string().min(10, "Content is required and must be at least 10 characters long").max(1000),
});
