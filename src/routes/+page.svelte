<script lang="ts">
	import { page } from '$app/stores';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { Recipe } from '$lib/models/recipe';
	import { filterByLevelRange } from '$lib/utils/filterByLevelRange';


	$:getRecipes = () => {
		const params            = new URLSearchParams($page.url.searchParams.toString());
		const slug              = params.get('bench');
		const recipes: Recipe[] = Array.from($page.data.recipes.values());
		const minLevel          = parseInt(params.get('minLevel') ?? '0');
		const maxLevel          = parseInt(params.get('maxLevel') ?? '100');

		if (!slug) {
			return filterByLevelRange(minLevel, maxLevel, Array.from($page.data.recipes.values()));
		}

		if (!recipes) {
			return [];
		}

		return filterByLevelRange(
			minLevel,
			maxLevel,
			(recipes).filter(recipe => {
				if (params.has('bench')) {
					const bench = $page.data.benches.find(bench => bench.slug === slug);

					if (bench) {
						return recipe.benches.includes(bench.id);
					} else {
						return true;
					}
				}
			})
		);
	};
</script>


<div class="container h-full mx-auto flex items-center justify-center my-4">
	<div class="w-full px-4 space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Recipes</h2>

		<div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each getRecipes() as recipe}
				<RecipeCard recipe={recipe} />
			{/each}
		</div>
	</div>
</div>
