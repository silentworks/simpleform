import { post } from "./schema";
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(process.env.DATABASE_URL);

const db = drizzle(client, { schema });

async function seed() {
  await db.insert(post).values([
    {
      title: "Before it rains, it Drizzle",
      content:
        "Drizzle is great for working with databases and is an awesome ORM.",
    },
    {
      title: "Being able to server render is great",
      content:
        "Server rendering of this form has been great and it's interactions still work with or without JavaScript turned on in the browser.",
    },
    {
      title: "Drizzling all the time",
      content:
        "Drizzle and Zod are a good match. But also any server side framework makes the deal complete.",
    },
  ]);
}

seed();
