<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { appStore } from '$lib/stores/app';
</script>

<div data-popup="popupIngredient">
	<div
		class="card variant-filled-surface flex flex-col w-72 shadow-xl pointer-events-none z-50"
		transition:fade={{ duration: 500, easing: quintOut }}
	>
		{#if !$appStore.ingredientPopup}
			<header class="card-header flex justify-between items-end pb-4 text-xl">
				<div class="placeholder animate-pulse w-1/2" />
			</header>

			<hr class="opacity-50" />

			<section class="p-4 flex-grow">
				<div class="placeholder animate-pulse w-full" />
			</section>

			<hr class="opacity-50" />

			<footer class="card-footer p-4 pointer-events-auto overflow-hidden">
				<h6 class="h6">Source</h6>
				<div class="placeholder animate-pulse w-3/4" />
			</footer>
		{:else}
			<header class="card-header flex justify-between items-end pb-4 text-xl">
				<p class="font-bold">{$appStore.ingredientPopup.name}</p>
			</header>

			{#if $appStore.ingredientPopup.description}
				<hr class="opacity-50" />

				<section class="p-4 flex-grow">
					<p>{$appStore.ingredientPopup.description}</p>
				</section>
			{/if}

			<hr class="opacity-50" />

			<footer class="card-footer p-4 pointer-events-auto overflow-hidden">
				<h6 class="h6">Source(s)</h6>
				{@html $appStore.ingredientPopup.source}
			</footer>
		{/if}
	</div>
</div>
