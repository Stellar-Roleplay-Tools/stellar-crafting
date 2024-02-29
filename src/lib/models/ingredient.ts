import type { Recipe } from './recipe';

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  recipes: number[];
};
