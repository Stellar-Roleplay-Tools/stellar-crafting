<script lang="ts">
	import { slide } from 'svelte/transition';
	import { queue } from '$lib/stores/queue';
	import { type QueueItem } from '$lib/stores/queue';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import CraftingTime from '$lib/components/Queue/CraftingTime.svelte';


	export let items: QueueItem[];


	let drawerStore = getDrawerStore();

	const onAddToQueue = (item) => {
		$queue.items = $queue.items.map(q => {
			if (q.recipe.id === item.recipe.id) {
				return {
					...q,
					quantity: q.quantity + 1
				};
			}
			return q;
		});
	};

	const onRemoveFromQueue = (item) => {
		if (item.quantity === 1) {
			$queue.items = $queue.items.filter(q => q.recipe.id !== item.recipe.id);
		} else {
			$queue.items = $queue.items.map(q => {
				if (q.recipe.id === item.recipe.id) {
					return {
						...q,
						quantity: q.quantity - 1
					};
				}
				return q;
			});
		}
	};

	const onRemoveAllFromQueue = (item) => {
		$queue.items = $queue.items.filter(q => q.recipe.id !== item.recipe.id);
	};

	const onClearQueue = () => {
		$queue.items = [];

		drawerStore.close();
	};
</script>

<div class="flex flex-col">
	<div class="flex justify-between items-center p-2 h-14">
		<h2 class="h2">Crafting Queue</h2>
	</div>

	<div class="flex justify-between items-center lg:order-last px-2">
		<button type="button" class="btn btn-md variant-filled h-12" on:click={onClearQueue}>Clear</button>
		<CraftingTime />
	</div>

	<div class="flex flex-col flex-grow">
		{#if items.length === 0}
			<div class="flex justify-center items-center p-2">
				<span class="font-bold">No items in the queue</span>
			</div>
		{:else}
			<div transition:slide>
				{#each items as item}
					<div class="flex justify-between items-center p-2" transition:slide>
						<span>{item.recipe.name}</span>
						<div class="flex items-center gap-2">
							<button type="button" class="btn btn-md variant-filled" on:click={() => onRemoveFromQueue(item)}>&minus;
							</button>
							<span>{item.quantity}</span>
							<button type="button" class="btn btn-md variant-filled" on:click={() => onAddToQueue(item)}>&plus;
							</button>
							<button type="button" class="btn btn-md variant-ghost-surface" on:click={() => onRemoveAllFromQueue(item)}>
								Remove
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
