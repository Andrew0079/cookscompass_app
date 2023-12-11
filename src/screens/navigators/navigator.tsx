import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main-navigator";
import AuthNavigator from "./auth-navigator";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user-slice";
import { ROUTES } from "../../utils/common";
import { useSelector } from "react-redux";
import theme from "../../../theme";
import { RootState } from "../../redux/store";

const { Navigator: StackNavigator, Screen } = createStackNavigator();

// Define common screen options to hide the header
const commonScreenOptions = {
  headerShown: false,
};

function Navigator() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    const isUserAuthenticated = async () => {
      try {
        const response = await Auth.currentAuthenticatedUser();
        const email = response.attributes.email;
        const username = response.attributes.preferred_username;
        const id = response.attributes.sub;
        const jwtToken = response.signInUserSession.accessToken.jwtToken;
        const refreshToken = response.signInUserSession.refreshToken.token;
        const payload = response.signInUserSession.accessToken.payload;
        dispatch(
          setUser({ email, username, id, jwtToken, refreshToken, payload })
        );
        setIsAuthenticated(true); // User is authenticated
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false); // User is not authenticated
        setLoading(false);
      }
    };
    // Check if the user is authenticated
    isUserAuthenticated();
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

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
