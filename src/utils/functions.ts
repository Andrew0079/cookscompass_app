import { api } from "../api/api";

const handleRecipeActions = async (userId: number, recipeId: string) => {
  const response = await api.postLikeRecipeAction(userId, recipeId);
  return response;
};

export { handleRecipeActions };
