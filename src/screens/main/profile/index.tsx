import React, { useState } from "react";
import { View, Text, Avatar, Button } from "native-base";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { VStack, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/user-slice";
import {
  Modal,
  Alert,
  ActivityIndicator,
  // @ts-ignore
} from "@components";
// @ts-ignore
import { api } from "@api/api";
import { ROUTES } from "../../../utils/common";

function Profile({ navigation }) {
  const [formError, setFormError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const username = user?.username;
  const email = user?.email;

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await api.logout();
      dispatch(setUser(null));
      setLoading(false);
      navigation.navigate(ROUTES.AUTH, { screen: ROUTES.SIGN_IN_OR_SIGN_UP });
    } catch (error) {
      setFormError("Logout failed. Please try again.");
      setLoading(false);
      setVisible(true);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Modal visible={visible} onClose={setVisible}>
        <Alert
          backgroundColor="white"
          errorMessage={formError}
          onPress={() => setVisible(false)}
        />
      </Modal>
      <ActivityIndicator loading={loading} />
      <VStack>
        <HStack
          alignContent="center"
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={5}
          marginTop={5}
        >
          <Avatar
            size={60}
            marginRight={3}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <VStack justifyContent="center">
            {email && (
              <Text fontWeight="bold" alignSelf="center">
                {email}
              </Text>
            )}
            {username && <Text>{username}</Text>}
          </VStack>
        </HStack>
        <View
          borderBottomWidth={1}
          borderBottomColor="#CACCCE"
          marginLeft={5}
          marginRight={5}
        >
          <View>
            <Text fontWeight="bold" fontSize="lg">
              General
            </Text>
          </View>
          <View backgroundColor="white" marginTop={3}>
            <TouchableOpacity>
              <HStack
                alignContent="center"
                justifyContent="space-between"
                paddingBottom={2}
              >
                <Text>Email</Text>
                <FontAwesome name="chevron-right" size={15} />
              </HStack>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          width="40%"
          marginTop={5}
          variant="outline"
          alignSelf="center"
          borderRadius="25"
          onPress={handleSignOut}
        >
          <Text>Sign Out</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: { flex: 1 },
});

export default Profile;
