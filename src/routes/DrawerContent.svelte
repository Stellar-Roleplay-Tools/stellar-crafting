<script>
import Queue from '$lib/components/Queue/Queue.svelte';
import { getDrawerStore } from '@skeletonlabs/skeleton';
import ShoppingList from '$lib/components/Queue/ShoppingList.svelte';
import { queue } from '$lib/stores/queue';

let drawerStore = getDrawerStore();
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 lg:px-4 w-full h-full py-2">
	<Queue items={$queue.items} />
	<ShoppingList items={$queue.items} />
</div>
