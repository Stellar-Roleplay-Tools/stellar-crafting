<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';


	let currentBench = '';

	const onSetBench = () =>{
		const params = new URLSearchParams($page.url.searchParams.toString());

		if (!!currentBench) {
			params.set('bench', currentBench);
		} else {
			params.delete('bench');
		}

		goto(`?${params.toString()}`);
	}
</script>

<select class="select lg:max-w-sm h-fit col-span-2" bind:value={currentBench} on:change={onSetBench}>
	<option value="">All Benches</option>
	{#each $page.data.benches as bench}
		<option value={bench.slug}>{bench.name}</option>
	{/each}
</select>
