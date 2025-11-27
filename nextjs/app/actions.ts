'use server'
import { formatError } from "@/lib"
import { PostSchema } from "@/lib/validationSchema"
import { db } from '@/lib/server/db';
import { post } from '@/lib/server/db/schema';
import { revalidatePath } from "next/cache";

export async function saveData(_: any, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const validationFields = PostSchema.safeParse({ title, content });
  if (!validationFields.success) {
    const errors = formatError(validationFields.error)
    return { errors, title, content }
  }

  // write to database
  const result = await db.insert(post).values({
    title,
    content
  });

  if (!result) {
    return {
      success: false,
      message: 'Server error. Try again later.'
    }
  }

  revalidatePath("/");

  return {
    success: true,
    message: 'Post created successfully'
  };
}

