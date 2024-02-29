import type { Bench } from '$lib/models/bench';
import type { Ingredient } from '$lib/models/ingredient';
import type { IngredientToRecipe } from '$lib/models/ingredientToRecipe';
import type { Recipe } from '$lib/models/recipe';
import { mapRecipes, mapIngredients, mapBenches } from '$lib/utils/dataMapping';
import type { LayoutServerLoad } from './$types';
import { Collections } from '$lib/collections';


export const load = (async ({ locals }) => {
	// const ingredients = (await locals.pb.collection('ingredients').getFirstListItem(`id="${STORE_ID}"`));
	const benchRecords         = (await locals.pb.collection(Collections.Benches).getList<Bench>()).items;
	const ingredientsRecords   = (await locals.pb.collection(Collections.Ingredients).getFullList<Ingredient>());
	const recipesRecords       = (await locals.pb.collection(Collections.Recipes).getFullList<Recipe>());
	const ingredientsToRecipes = (await locals.pb.collection(Collections.IngredientToRecipe)
		.getFullList<IngredientToRecipe>());


	const benches     = mapBenches(benchRecords, locals.pb);
	const ingredients = mapIngredients(ingredientsRecords, ingredientsToRecipes);
	const recipes     = mapRecipes(recipesRecords, ingredientsToRecipes);

	return {
		benches:     structuredClone(benches ?? []),
		ingredients: structuredClone(ingredients ?? []),
		recipes:     structuredClone(recipes ?? []),
	};
}) satisfies LayoutServerLoad;
