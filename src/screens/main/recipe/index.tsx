import React, { useEffect, useState } from "react";
import { Box, Text } from "native-base";
// @ts-ignore
import { RecipeCardView } from "@components";
// @ts-ignore
import { api } from "@api/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/slices/loading-slice";
import { setError } from "../../../redux/slices/error-slice";

function Recipe({ route }) {
  const [recipeDetail, setRecipeDetail] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getRecipeDetails = async () => {
      dispatch(setLoading(true));
      const id = route.params.id;
      if (id) {
        try {
          const response = await api.getRecipeById(id);
          const data = response?.data?.recipe || null;
          setRecipeDetail(data);
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      }
    };
    getRecipeDetails();
  }, [route.params.id]);

  return <>{recipeDetail && <RecipeCardView recipeDetail={recipeDetail} />}</>;
}

export default Recipe;
