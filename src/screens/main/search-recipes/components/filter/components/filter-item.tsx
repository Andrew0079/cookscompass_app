import React from "react";
import { Box, HStack } from "native-base";
import {
  FilterBadge,
  // @ts-ignore
} from "@components";

function FilterItem({
  filters,
  section,
  isTitle,
  itemKey,
  item,
  isSelected,
  data,
  onSetSection,
  onSetFilters,
}: {
  filters?: object | null;
  section?: string | null;
  isTitle?: boolean;
  itemKey?: string;
  isSelected?: boolean;
  item?: string;
  data?: string[];
  onSetSection?: (value: string | null) => void;
  onSetFilters?: any;
}) {
  return (
    <Box>
      {isTitle && item ? (
        <Box margin={1}>
          <FilterBadge
            item={item}
            isSelected={isSelected}
            onPress={() => {
              onSetSection(itemKey);
            }}
            fontWeight="bold"
          />
        </Box>
      ) : (
        <HStack flexWrap="wrap">
          {data.length > 0 &&
            data.map((item: string, index: number) => (
              <Box margin={1} key={`key-${index}`}>
                <FilterBadge
                  isSelected={filters?.[section]?.includes(item)}
                  item={item}
                  onPress={() => {
                    const newFilters = { ...filters };

                    // Check if the section exists in filters
                    if (newFilters[section]) {
                      if (newFilters[section].includes(item)) {
                        // Remove the item if it is already selected
                        newFilters[section] = newFilters[section].filter(
                          (i: string) => i !== item
                        );
                      } else {
                        // Add the item if it is not selected
                        newFilters[section] = [...newFilters[section], item];
                      }
                    } else {
                      // Create a new array with the item
                      newFilters[section] = [item];
                    }

                    onSetFilters(newFilters);
                  }}
                />
              </Box>
            ))}
        </HStack>
      )}
    </Box>
  );
}

export default FilterItem;
