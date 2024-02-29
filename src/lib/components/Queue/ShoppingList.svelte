<script lang="ts">
	import { type QueueItem } from '$lib/stores/queue';
	import { page } from '$app/stores';
	import { getIngredientsFromQueue } from '$lib/utils/getIngredients';
	import Icon from '$lib/components/Icon.svelte';
	import FaChevronUp from 'svelte-icons/fa/FaChevronUp.svelte';
	import { AppRailTile, getDrawerStore } from '@skeletonlabs/skeleton';

	export let items: QueueItem[];

	let drawerStore = getDrawerStore();
</script>

<div class="flex flex-col lg:border-l-2 lg:border-l-gray-700">
	<div class="flex justify-between items-center p-2 px-4 h-14">
		<h2 class="h2">Shopping List</h2>
	</div>

	{#if items.length > 0}
		<ul class="flex-grow px-4 py-2 leading-10">
			{#each getIngredientsFromQueue(items, $page.data.recipes, $page.data.ingredients) as ingredient}
				<li>{ingredient.name} x {ingredient.quantity}</li>
			{/each}
		</ul>
	{/if}

	<div class="flex justify-end">
		<AppRailTile
			name="queue"
			title="queue"
			group="hideQueue"
			value={1}
			on:click={() => drawerStore.close()}
		>
			<svelte:fragment slot="lead">
				<Icon>
					<FaChevronUp />
				</Icon>
			</svelte:fragment>
			<div class="pt-1">Hide Queue</div>
		</AppRailTile>
	</div>
</div>
