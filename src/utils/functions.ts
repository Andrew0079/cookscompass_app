import { api } from "../api/api";

const handleRecipeActions = async (recipeId: string) => {
  try {
    const response = await api.postLikeRecipeAction(recipeId);
    console.log(response);
  } catch (error) {
    return false;
  }
};

export { handleRecipeActions };
