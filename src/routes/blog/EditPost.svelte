<script>
  import { createEventDispatcher } from 'svelte';

  export let editedContent = '';

  const dispatch = createEventDispatcher();

  function handleSave() {
    dispatch('save');
  }
</script>

<style>
  .edit-container {
    display: flex;
    flex-direction: column;
  }

  textarea {
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #3498db;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>

<div class="edit-container">
  <textarea bind:value={editedContent}></textarea>
  <button on:click={handleSave}>Save</button>
</div>
