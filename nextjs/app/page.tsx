import SimpleForm from "./form";
import { db } from "@/lib/server/db";
import { post } from "@/lib/server/db/schema";

export default async function Home() {
  const posts = await db.select({
    id: post.id,
    title: post.title,
    content: post.content
  }).from(post);

  return (
    <div>
      <h1>Simple Form</h1>

      <SimpleForm />
      <br />
      <hr />
      {posts ? posts.map(post => (
        <div key={`post-${post.id}`}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
