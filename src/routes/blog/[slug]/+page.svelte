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
</style>

<main>
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
