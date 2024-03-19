import { writable } from 'svelte/store';
import type { Recipe } from '$lib/models/recipe';

type Queue = {
	items: QueueItem[];
}

export type QueueItem = {
	recipe: Recipe;
	quantity: number;
};

export const queue = writable<Queue>({
	items: [],
});
