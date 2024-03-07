<script lang="ts">
	import '../app.postcss';
	import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerContent from './DrawerContent.svelte';
	import IngredientCard from '$lib/components/IngredientCard.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Bench } from '$lib/models/bench';

	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initialize the stores for Skeleton UI
	initializeStores();

	// Set the theme based on the currently set crafting bench
	onMount(() => {
		const params = new URLSearchParams($page.url.searchParams.toString());

		const benchSlug = params.get('bench') || '';
		const bench = $page.data.benches.find((b: Bench) => b.slug === benchSlug);

		document.body.setAttribute('data-theme', bench && bench.theme ? bench.theme : 'skeleton');
	});
</script>

<svelte:head>
	<title>Stellar Crafting</title>
</svelte:head>

<Toast />

<Drawer position="top">
	<DrawerContent />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<slot />
	<IngredientCard />
</AppShell>
