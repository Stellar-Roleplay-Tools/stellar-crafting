import type { Recipe } from '$lib/models/recipe';


export const filterByLevelRange = (min  = 0, max = 100, data: Recipe[]) => {
	return data.filter((item) => item.levelLearned >= min && item.levelLearned <= max);
};
