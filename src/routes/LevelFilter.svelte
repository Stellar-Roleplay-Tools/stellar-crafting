<script lang="ts">
	import FaFilter from 'svelte-icons/fa/FaFilter.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let minLevel = $page.url.searchParams.get('minLevel') ?? 0;
	let maxLevel = $page.url.searchParams.get('maxLevel') ?? 100;

	const onUpdateQueryParams = () => {
		const queryParams = new URLSearchParams($page.url.search);

		if (minLevel === 0) {
			queryParams.delete('minLevel');
		} else {
			queryParams.set('minLevel', `${minLevel}`);
		}

		if (maxLevel === 100) {
			queryParams.delete('maxLevel');
		} else {
			queryParams.set('maxLevel', `${maxLevel}`);
		}

		goto(`?${queryParams.toString()}`);
	};

	const resetLevelFilters = () => {
		minLevel = 0;
		maxLevel = 100;
		onUpdateQueryParams();
	};
</script>

<div class="flex gap-4 items-center justify-center">
	<div class="w-4 h-4">
		<FaFilter />
	</div>
	<div class="flex gap-4 items-center justify-center">
		Lv.
		<label class="label">
			Min
			<input
				type="number"
				class="input w-24 h-12"
				bind:value={minLevel}
				on:change={onUpdateQueryParams}
				on:keyup={onUpdateQueryParams}
			/>
		</label>
		<label class="label">
			Max
			<input
				type="number"
				class="input w-24 h-12"
				bind:value={maxLevel}
				on:change={onUpdateQueryParams}
				on:keyup={onUpdateQueryParams}
			/>
		</label>

		<button class="btn variant-filled" on:click={resetLevelFilters}>Reset</button>
	</div>
</div>
