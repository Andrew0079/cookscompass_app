import { createSlice } from "@reduxjs/toolkit";

const discoverySlice = createSlice({
  name: "discovery",
  initialState: {
    value: null,
  },
  reducers: {
    setDiscoveryData: (state, action) => {
      state.value = action.payload;
    },
    optimisticUpdateLikeStatus: (state, action) => {
      const { recipeId } = action.payload;

      // Map over the categories to return a new array
      state.value = state.value.map((discovery) => {
        // Find the recipe index
        const nodeIndex = discovery.data.data.findIndex(
          (recipe) => recipe.node.id === recipeId
        );

        if (nodeIndex !== -1) {
          const node = discovery.data.data[nodeIndex].node;

          // Construct the new recipe object with updated properties
          const newRecipeNode = {
            ...node,
            previousLikeCount: node.likes,
            previousIsLiked: node.isRecipeLiked,
            likes: node.isRecipeLiked ? node.likes - 1 : node.likes + 1,
            isRecipeLiked: !node.isRecipeLiked,
          };

          // Construct the new node object with the updated recipe node
          const newNode = {
            ...discovery.data.data[nodeIndex],
            node: newRecipeNode,
          };

          // Construct the new data array with the updated node
          const newDataArray = [
            ...discovery.data.data.slice(0, nodeIndex),
            newNode,
            ...discovery.data.data.slice(nodeIndex + 1),
          ];

          // Return the new discovery object with updated data array
          return {
            ...discovery,
            data: {
              ...discovery.data,
              data: newDataArray,
            },
          };
        }

        // If the recipe is not found, return the category as is
        return discovery;
      });
    },
    revertUpdateLikeStatus: (state, action) => {
      const { recipeId } = action.payload;

      // Map over the categories to return a new array
      state.value = state.value.map((discovery) => {
        // Find the recipe index
        const nodeIndex = discovery.data.data.findIndex(
          (node) => node.node.id === recipeId
        );

        // If the recipe is found, proceed with the revert
        if (nodeIndex !== -1) {
          const node = discovery.data.data[nodeIndex].node;

          // Check if the previous state is saved
          if (
            node.previousLikeCount !== undefined &&
            node.previousIsLiked !== undefined
          ) {
            // Construct the reverted recipe object with the previous properties
            const revertedRecipeNode = {
              ...node,
              likes: node.previousLikeCount,
              isRecipeLiked: node.previousIsLiked,
            };

            // Remove the properties used for optimistic update
            delete revertedRecipeNode.previousLikeCount;
            delete revertedRecipeNode.previousIsLiked;

            // Construct the new node object with the reverted recipe node
            const newNode = {
              ...discovery.data.data[nodeIndex],
              node: revertedRecipeNode,
            };

            // Construct the new data array with the updated node
            const newDataArray = [
              ...discovery.data.data.slice(0, nodeIndex),
              newNode,
              ...discovery.data.data.slice(nodeIndex + 1),
            ];

            // Return the new discovery object with updated data array
            return {
              ...discovery,
              data: {
                ...discovery.data,
                data: newDataArray,
              },
            };
          }
        }

        // If the recipe is not found or there's no previous state, return the discovery as is
        return discovery;
      });
    },
    realTimeUpdateLikeCount: (state, action) => {
      const { recipeId, newLikeCount } = action.payload;
      state.value = state.value.map((discovery) => {
        const nodeIndex = discovery.data.data.findIndex(
          (node) => node.node.id === recipeId
        );
        if (nodeIndex !== -1) {
          const node = discovery.data.data[nodeIndex].node; // Corrected access to the node object
          // Construct the new node object with the updated like count
          const newNode = {
            ...discovery.data.data[nodeIndex], // Spread the existing node structure
            node: {
              ...node,
              likes: newLikeCount, // Update the like count
            },
          };
          // Construct the new data array with the updated node
          const newDataArray = [
            ...discovery.data.data.slice(0, nodeIndex),
            newNode,
            ...discovery.data.data.slice(nodeIndex + 1),
          ];
          // Return the new discovery object with updated data array
          return {
            ...discovery,
            data: {
              ...discovery.data,
              data: newDataArray,
            },
          };
        }
        return discovery;
      });
    },
  },
});

export const {
  setDiscoveryData,
  optimisticUpdateLikeStatus,
  revertUpdateLikeStatus,
  realTimeUpdateLikeCount,
} = discoverySlice.actions;

export default discoverySlice.reducer;
