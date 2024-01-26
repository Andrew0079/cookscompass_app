import { api } from "../api/api";

const handleRecipeActions = async (recipeId: string) => {
  const response = await api.postLikeRecipeAction(recipeId);
  return response;
};

export { handleRecipeActions };
