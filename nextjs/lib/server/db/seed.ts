import { db } from ".";
import { post } from "./schema";

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
