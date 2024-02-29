<script lang="ts">
	import { getCraftingTime } from '$lib/utils/getCraftingTime';
	import { queue } from '$lib/stores/queue';

	$:craftingTime = getCraftingTime($queue.items.reduce((acc, item) => acc + (item.recipe.craftingTime * item.quantity), 0));
</script>

<div class="flex flex-col justify-between p-2 text-right">
	<span class="font-bold">Time to Craft</span>
	<span>{craftingTime}</span>
</div>
