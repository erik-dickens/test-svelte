<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import posts from '../posts.json';

  let post = null;

  onMount(() => {
    const slug = $page.params.slug;
    post = posts.find(p => p.slug === slug);
  });
</script>

<style>
  @import '../blog.css';
</style>

<main>
  {#if post}
    <h1>{post.title}</h1>
    <div>{post.content}</div>
  {:else}
    <p>Post not found.</p>
  {/if}
</main>
