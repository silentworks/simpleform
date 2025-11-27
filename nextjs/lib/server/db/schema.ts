import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const post = sqliteTable('post', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text(),
	content: text(),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});
