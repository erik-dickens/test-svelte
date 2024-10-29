<script>
  import { onMount } from 'svelte';
  import posts from './posts.json';

  let blogPosts = [];

  onMount(() => {
    blogPosts = posts;
  });
</script>

<style>
  @import './blog.css';
</style>

<main>
  <h1>Blog</h1>
  <ul>
    {#each blogPosts as post}
      <li>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </li>
    {/each}
  </ul>
</main>
