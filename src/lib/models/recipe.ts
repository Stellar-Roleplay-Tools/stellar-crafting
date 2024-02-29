export type Recipe = {
  id: string;
  ingredientId: string;
  name: string;
  yield: number;
  levelLearned: number;
  craftingTime: number;
  successRate: number;
  benches: string[];
  ingredients: {
    id: string;
    quantity: number;
  }[];
};
