<script lang="ts">
	import { AppBar, AppRailTile, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
	import Benches from './Benches.svelte';


	const drawerSettings: DrawerSettings = {
		height: 'h-fit',
	};
	const drawerStore = getDrawerStore();
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
		<a class="btn btn-sm variant-ghost-surface" href="https://github.com/T-Fei-Technologies/stellar-crafting" target="_blank" rel="noreferrer">
			GitHub
		</a>
	</svelte:fragment>

	<svelte:fragment slot="headline">
		<div class="grid grid-cols-3 items-center">
			<Benches />

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
