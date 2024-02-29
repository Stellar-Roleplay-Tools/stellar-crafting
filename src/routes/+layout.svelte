<script lang="ts">
	import '../app.postcss';
	import { AppShell, Drawer, Toast } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerContent from './DrawerContent.svelte';

	// Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Initialize the stores for Skeleton UI
	initializeStores();
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
</AppShell>
