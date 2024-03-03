import { writable } from 'svelte/store';
import type { Ingredient } from '$lib/models/ingredient';


type AppStore = {
	ingredientPopup: Ingredient | undefined;
}


export const appStore = writable<AppStore>({
	ingredientPopup: undefined,
});
