import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { PostSchema } from '$lib/validationSchema';
import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { formatError } from '$lib';

export const load: PageServerLoad = async () => {
  const posts = await db.select({
    id: post.id,
    title: post.title,
    content: post.content
  }).from(post);

  if (!posts) {
    return {}
  }

  return { posts };
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    try {
      PostSchema.parse({
        title,
        content
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatError(err);
        return fail(400, { errors, title, content });
      }
    }

    // write to database
    const result = await db.insert(post).values({
      title,
      content
    });

    if (!result) {
      return fail(
        500,
        {
          success: false,
          message: 'Server error. Try again later.'
        }
      );
    }

    return {
      success: true,
      message: 'Post created successfully'
    };
  }
} satisfies Actions;
