<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Bench } from '$lib/models/bench';

	let currentBench = $page.url.searchParams.get('bench') || '';

	const onSetBench = () =>{
		const params = new URLSearchParams($page.url.search);
		if (!!currentBench) {
			params.set('bench', currentBench);
		} else {
			params.delete('bench');
		}

		goto(`?${params.toString()}`);

		// Set bench theme
		const bench = $page.data.benches.find((b: Bench) => b.slug === currentBench);
		document.body.setAttribute('data-theme', bench && bench.theme ? bench.theme : 'skeleton');
	}
</script>

<select class="select lg:max-w-sm h-fit col-span-2" bind:value={currentBench} on:change={onSetBench}>
	<option value="">All Benches</option>
	{#each $page.data.benches as bench}
		<option value={bench.slug}>{bench.name}</option>
	{/each}
</select>
