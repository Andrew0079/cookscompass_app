import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main-navigator";
import AuthNavigator from "./auth-navigator";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user-slice";
import { ROUTES } from "../../utils/common";
import { useSelector } from "react-redux";
import theme from "../../../theme";
import { RootState } from "../../redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/config";

const { Navigator: StackNavigator, Screen } = createStackNavigator();

// Define common screen options to hide the header
const commonScreenOptions = {
  headerShown: false,
};

function Navigator() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          const customUser = firebaseUser as unknown as {
            email: string;
            uid: string;
            stsTokenManager: { accessToken: string };
            displayName: string;
          };
          dispatch(
            setUser({
              email: customUser.email,
              token: customUser.stsTokenManager.accessToken,
              id: customUser.uid,
              username: customUser.displayName,
            })
          );
        } else {
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StackNavigator
          screenOptions={{
            ...commonScreenOptions,
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <Screen name={ROUTES.MAIN} component={MainNavigator} />
          ) : (
            <Screen name={ROUTES.AUTH} component={AuthNavigator} />
          )}

          {/* Add more screens as needed */}
        </StackNavigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default Navigator;
