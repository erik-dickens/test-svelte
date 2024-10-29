<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import posts from '../posts.json';
  import EditPost from '../EditPost.svelte';

  let post = null;
  let isEditing = false;
  let editedContent = '';

  onMount(() => {
    const slug = $page.params.slug;
    post = posts.find(p => p.slug === slug);
    if (post) {
      editedContent = post.content;
    }
  });

  function handleEdit() {
    isEditing = true;
  }

  function handleSave() {
    // Save the edited content
    post.content = editedContent;
    isEditing = false;
    // Call the API to save the changes
    fetch('/api/savePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(response => {
      if (!response.ok) {
        console.error('Failed to save the post');
      }
    });
  }
</script>

<style>
  @import '../blog.css';
  .back-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .back-link svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
</style>

<main>
  <a href="/blog" class="back-link">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Back to Blog
  </a>
  {#if post}
    <h1>{post.title}</h1>
    {#if isEditing}
      <EditPost {editedContent} on:save={handleSave} />
    {:else}
      <div>{post.content}</div>
      <button on:click={handleEdit}>Edit</button>
    {/if}
  {:else}
    <p>Post not found.</p>
  {/if}
</main>
