import React from "react";
import { Box, HStack } from "native-base";
import {
  FilterBadge,
  // @ts-ignore
} from "@components";

function FilterItem({
  isTitle,
  itemKey,
  item,
  isSelected,
  data,
  onSetSection,
}: {
  isTitle?: boolean;
  itemKey?: string;
  isSelected?: boolean;
  item?: string;
  data?: string[];
  onSetSection?: (value: string | null) => void;
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
                <FilterBadge item={item} />
              </Box>
            ))}
        </HStack>
      )}
    </Box>
  );
}

export default FilterItem;
