<script lang="ts">
	import { page } from '$app/stores';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { appStore } from '$lib/stores/app';
	import { popup } from '@skeletonlabs/skeleton';


	export let ingredientId: string;

	const popupIngredient: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'hover',
		// Matches the data-popup value on your popup element
		target: 'popupIngredient',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	const setIngredientPopup = (ingredientId: string) => {
		$appStore.ingredientPopup = $page.data.ingredients.get(ingredientId);
	};
</script>

<span
	class="font-bold border-b-2 border-dashed cursor-pointer pointer-events-auto"
	on:mouseover={setIngredientPopup.bind(null, ingredientId)}
	on:focus={() => {}}
	role="tooltip"
	use:popup={popupIngredient}
>
	{$page.data.ingredients.get(ingredientId)?.name}
</span>
