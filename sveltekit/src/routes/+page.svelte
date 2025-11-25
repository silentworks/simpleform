<script lang="ts">
import { enhance } from '$app/forms';
import type { ActionData, PageData } from './$types';

interface Props {
    data: PageData;
	form: ActionData;
}

let { form, data }: Props = $props();

</script>

<h1>Simple Form</h1>

<form method="post" use:enhance>
    <div>
        <label for="title">Title</label><br />
        <input
            id="title"
            name="title"
            type="text"
            value={form?.title ?? ''}
        />
    </div>
    {#if form?.errors?.title}
        <p>{form?.errors?.title}</p>
    {/if}

    <br />
    <div>
        <label for="content">Content</label><br />
        <textarea id="content" name="content" cols="30" rows="10">{form?.content ?? ''}</textarea>
    </div>
    {#if form?.errors?.content}
        <p>{form?.errors?.content}</p>
    {/if}
    <br />
    <button>Save</button>
</form>

<br />
<hr />
{#each data.posts as post, i (post.id)}
    <div id={`post-${i}`}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    </div>
{:else}
    <div>No posts found</div>
{/each}
