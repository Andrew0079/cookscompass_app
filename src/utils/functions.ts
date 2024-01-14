import { api } from "../api/api";

const handleRecipeActions = async (userId: number, recipeId: string) => {
  try {
    const response = await api.postLikeRecipeAction(userId, recipeId);
    console.log(response);
  } catch (error) {
    return false;
  }
};

export { handleRecipeActions };
