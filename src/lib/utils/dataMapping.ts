import type { Ingredient } from '$lib/models/ingredient';
import type { Recipe } from '$lib/models/recipe';


export const mapBenches = (
	benches: import('pocketbase').default['benches']['model'],
	pb: import('pocketbase').default
) =>
	benches
		.map((bench) => ({
			...bench,
			imageUrl: pb.files.getUrl(bench, bench.image)
		}))
		.sort((a, b) => a.list_order - b.list_order);

export const mapIngredients = (
	ingredients: import('pocketbase').default['ingredients']['model'],
	ingredientToRecipes: import('pocketbase').default['ingredientToRecipe']['model']
): Map<string, Ingredient> =>
	new Map(
		ingredients.map((ingredientRecord) => [
			ingredientRecord.id,
			{
				id:          ingredientRecord.id,
				name:        ingredientRecord.name,
				price:       ingredientRecord.price,
				description: ingredientRecord.description,
				source:      ingredientRecord.source,
				recipes:     ingredientToRecipes
											 .filter(ingredientToRecipe => ingredientToRecipe.ingredient === ingredientRecord.id)
											 .map(ingredientToRecipe => ingredientToRecipe.recipe)
			}
		])
	);

export const mapRecipes = (
	recipes: import('pocketbase').default['recipes']['model'],
	ingredientToRecipes: import('pocketbase').default['ingredientToRecipe']['model']
): Map<string, Recipe> =>
	new Map(
		recipes
			.sort((a, b) => a.level_learned - b.level_learned)
			.map(recipe => [
				recipe.id,
				{
					id:           recipe.id,
					name:         recipe.name,
					yield:        recipe.yield,
					ingredientId: recipe.item,
					craftingTime: recipe.crafting_time,
					levelLearned: recipe.level_learned,
					successRate:  recipe.success_rate,
					benches:      recipe.benches,
					ingredients:  ingredientToRecipes
													.filter(ingredientToRecipe => ingredientToRecipe.recipe === recipe.id)
													.map(ingredientToRecipe => ({
														id:       ingredientToRecipe.ingredient,
														quantity: ingredientToRecipe.quantity
													}))
				}
			])
	);
