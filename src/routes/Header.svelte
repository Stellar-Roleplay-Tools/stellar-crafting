<script lang="ts">
	import { AppBar, AppRailTile, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
	import Benches from './Benches.svelte';
	import FaFilter from 'svelte-icons/fa/FaFilter.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const queryParams                    = new URLSearchParams($page.url.searchParams.toString());
	const drawerSettings: DrawerSettings = {
		height: 'h-fit'
	};
	const drawerStore                    = getDrawerStore();

	let minLevel = queryParams.get('minLevel') ?? 0;
	let maxLevel = queryParams.get('maxLevel') ?? 100;

	const onUpdateQueryParams = () => {
		queryParams.set('minLevel', `${minLevel}`);
		queryParams.set('maxLevel', `${maxLevel}`);
		goto(`?${queryParams.toString()}`);
	};
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a
			class="text-xl uppercase font-bold bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			href="/"
		>
			Stellar Crafting
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<a
			class="btn btn-sm variant-ghost-surface"
			href="https://github.com/T-Fei-Technologies/stellar-crafting"
			target="_blank"
			rel="noreferrer"
		>
			GitHub
		</a>
	</svelte:fragment>

	<svelte:fragment slot="headline">
		<div class="grid grid-cols-3 items-center">
			<div class="flex gap-4">
				<Benches />
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
					</div>
				</div>
			</div>

			<div class="flex justify-end">
				<AppRailTile
					name="queue"
					title="queue"
					group="showQueue"
					value={1}
					on:click={() => drawerStore.open(drawerSettings)}
				>
					<svelte:fragment slot="lead">
						<Icon>
							<FaChevronDown />
						</Icon>
					</svelte:fragment>
					<span>Show Queue</span>
				</AppRailTile>
			</div>
		</div>
	</svelte:fragment>
</AppBar>
