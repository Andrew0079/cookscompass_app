import React from "react";
import { Input, Icon, HStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Header,
  // @ts-ignore
} from "@components";

function SearchScreenHeader({
  onSearch,
  onSetQuery,
  onSetIsFilterOpen,
}: {
  onSearch: (value: boolean) => void;
  onSetQuery: (value: string | null) => void;
  onSetIsFilterOpen: (callback: (value: boolean) => boolean) => void;
}) {
  return (
    <Header paddingBottom={5} borderBottomWidth={1} borderBottomColor="#CACCCE">
      <HStack
        space={2}
        width="100%"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
        paddingLeft={5}
        paddingRight={5}
      >
        <Input
          placeholder="Search recipes..."
          width="78%"
          height={9}
          variant="rounded"
          fontSize="14"
          onChangeText={(text) => {
            const searchQuery = text === "" ? null : text;
            onSetQuery(searchQuery);
          }}
        />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            onSetIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
          }}
        >
          <Icon size="6" color="gray.500" as={<MaterialIcons name="tune" />} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => onSearch(true)}
        >
          <Icon
            size="6"
            color="gray.500"
            as={<MaterialIcons name="search" />}
          />
        </TouchableOpacity>
      </HStack>
    </Header>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 4,
    borderColor: "#CACCCE",
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default SearchScreenHeader;
