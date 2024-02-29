<script lang="ts">
	import type { Recipe } from '$lib/models/recipe';
  import { page } from '$app/stores';
  import { getCraftingTime } from '$lib/utils/getCraftingTime';
  import FaStopwatch from 'svelte-icons/fa/FaStopwatch.svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { queue } from '$lib/stores/queue';
  import { getToastStore } from '@skeletonlabs/skeleton';

  export let recipe: Recipe;

  let toastStore = getToastStore();

  const onAddToQueue = () => {
    const foundRecipe = $queue.items.find(q => q.recipe.id === recipe.id);

    if (!foundRecipe) {
      $queue.items = [...$queue.items, { recipe, quantity: 1 }];
    } else {
      foundRecipe.quantity += 1;
      $queue.items = [...$queue.items];
    }

    toastStore.trigger({ message: `${recipe.name} added to queue` });
  };
</script>

<div
  class="card flex flex-col pointer-events-none"
  transition:slide={{ duration: 500, axis: 'y', easing: quintOut }}
>
  <header class="card-header flex justify-between items-end pb-4 text-xl">
    <p class="font-bold">{recipe.name}</p>
    <div class="flex items-end gap-2">
      <p class="text-sm">Yields:</p>
      <span>{recipe.yield}</span>
    </div>
  </header>

  <hr class="opacity-50" />

  <section class="p-4 flex-grow grid grid-cols-3">
    <div class="col-span-2 text-left">
      <p>Ingredients</p>
      <div class="grid grid-cols-6">
        {#each recipe.ingredients as ingredient}
          <span class="text-right">{ingredient.quantity}</span>
          <span class="col-span-5 text-left">x&nbsp;
            <span class="font-bold">{$page.data.ingredients.get(ingredient.id)?.name}</span>
          </span>
        {/each}
      </div>
    </div>
    <div class="text-right">
      <p>Lv. {recipe.levelLearned}</p>
      <div class="flex justify-end items-center gap-1">
        <p>{getCraftingTime(recipe.craftingTime)}</p>
        <div class="size-3">
          <FaStopwatch />
        </div>
      </div>
      <p>{recipe.successRate}&percnt;</p>
    </div>
  </section>

  <hr class="opacity-50" />

  <footer class="card-footer p-0 pointer-events-auto overflow-hidden">
    <button type="button" class="w-full py-4 rounded-b-md hover:bg-success-100-800-token" on:click={onAddToQueue}>Add to Queue</button>
  </footer>
</div>
