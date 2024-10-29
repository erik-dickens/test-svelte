import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'src/routes/blog/posts.json');

export async function POST({ request }) {
  const updatedPost = await request.json();

  // Read the existing posts from the JSON file
  const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));

  // Find the index of the post to be updated
  const postIndex = posts.findIndex(post => post.slug === updatedPost.slug);

  if (postIndex === -1) {
    return json({ error: 'Post not found' }, { status: 404 });
  }

  // Update the post content
  posts[postIndex].content = updatedPost.content;

  // Save the updated posts array to the JSON file
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

  return json({ message: 'Post updated successfully' });
}
