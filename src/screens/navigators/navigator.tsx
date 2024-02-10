import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import MainNavigator from "./main-navigator";
import AuthNavigator from "./auth-navigator";
// @ts-ignore
import { ActivityIndicator, Modal, Alert } from "@components";
// @ts-ignore
import { api } from "@api/api";
import { Recipe, Tracker, Profile } from "../main";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user-slice";
import { ROUTES } from "../../utils/common";
import { useSelector } from "react-redux";
import theme from "../../../theme";
import { RootState } from "../../redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/config";
import { setError } from "../../redux/slices/error-slice";
import { setLoading } from "../../redux/slices/loading-slice";
import * as SplashScreen from "expo-splash-screen";
import { setDiscoveryData } from "../../redux/slices/discovery-slice";
import { useFonts } from "expo-font";

const { Navigator: StackNavigator, Screen } = createStackNavigator();

const commonScreenOptions = {
  headerShown: false,
};

const getRecipesByCategoryTags = async (tag: string) => {
  try {
    const response = await api.getRecipeByTag(tag);
    const nextPage =
      response?.data?.recipeSearch?.pageInfo?.hasNextPage || false;

    const data = response?.data?.recipeSearch?.edges || [];
    const cursor = response?.data?.recipeSearch?.pageInfo?.endCursor || null;
    return { data, nextPage, cursor };
  } catch (error) {
    console.error("Error fetching recipes by category:", error);

    return { data: [], nextPage: null, cursor: null };
  }
};

function Navigator() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.value);

  const loading = useSelector((state: RootState) => state.loading.value);

  const discoveryData = useSelector(
    (state: RootState) => state.discovery.value
  );

  const error = useSelector(
    (state: RootState) => state.error.value
  ) as unknown as { error: string; visible: boolean } | undefined;

  let [fontsLoaded, fontError] = useFonts({
    "FiraSansExtraCondensed-Thin": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Thin.ttf"),
    "FiraSansExtraCondensed-ThinItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-ThinItalic.ttf"),
    "FiraSansExtraCondensed-ExtraLight": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-ExtraLight.ttf"),
    "FiraSansExtraCondensed-ExtraLightItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-ExtraLightItalic.ttf"),
    "FiraSansExtraCondensed-Light": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Light.ttf"),
    "FiraSansExtraCondensed-LightItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-LightItalic.ttf"),
    "FiraSansExtraCondensed-Regular": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Regular.ttf"),
    "FiraSansExtraCondensed-Medium": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Medium.ttf"),
    "FiraSansExtraCondensed-MediumItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-MediumItalic.ttf"),
    "FiraSansExtraCondensed-SemiBold": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-SemiBold.ttf"),
    "FiraSansExtraCondensed-SemiBoldItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-SemiBoldItalic.ttf"),
    "FiraSansExtraCondensed-Bold": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Bold.ttf"),
    "FiraSansExtraCondensed-BoldItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-BoldItalic.ttf"),
    "FiraSansExtraCondensed-ExtraBold": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-ExtraBold.ttf"),
    "FiraSansExtraCondensed-ExtraBoldItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-ExtraBoldItalic.ttf"),
    "FiraSansExtraCondensed-Black": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-Black.ttf"),
    "FiraSansExtraCondensed-BlackItalic": require("../../../assets/fonts/Fira_Sans_Extra_Condensed/FiraSansExtraCondensed-BlackItalic.ttf"),
  });

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
              uid: customUser.uid,
              username: customUser.displayName,
              emailVerified: firebaseUser.emailVerified,
            })
          );
        } else {
          dispatch(setUser(null));
        }
      }
      if (firebaseUser === null) {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const getUserAndFetchCategories = async () => {
      try {
        // Step 1: Fetch the user if the user ID is available but customUserId is not
        const uid = currentUser?.uid;
        const customUserId = currentUser?.customUserId;
        if (uid && !customUserId) {
          const response = await api.getUser(uid);
          const fetchedCustomUserId = response?.id;
          // Update the state only if the fetchedCustomUserId is different from the current customUserId
          if (fetchedCustomUserId && fetchedCustomUserId !== customUserId) {
            dispatch(
              setUser({ ...currentUser, customUserId: fetchedCustomUserId })
            );
          }
          return; // Return here to wait for the next effect cycle after the state is updated
        }

        // Step 2: Fetch initial categories only if customUserId is set
        if (customUserId) {
          const initialCategories = [
            "drinks",
            "Low-Carb",
            "chicken",
            "Paleo",
            "desserts",
          ];
          const fetchedCategories = await Promise.all(
            initialCategories.map(async (tag) => ({
              title: tag,
              data: await getRecipesByCategoryTags(tag),
            }))
          );
          dispatch(setDiscoveryData(fetchedCategories));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    };

    getUserAndFetchCategories();
  }, [currentUser]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    if (appIsReady && fontsLoaded) {
      if (currentUser?.emailVerified) {
        if (discoveryData?.length === 5) {
          SplashScreen.hideAsync();
          dispatch(setLoading(false));
          setIsAuthenticated(true);
        }
      } else {
        console.log("hey");
        SplashScreen.hideAsync();
        dispatch(setLoading(false));
        setIsAuthenticated(false);
      }
    }
  }, [discoveryData, currentUser, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <ActivityIndicator loading={loading} />
        <Modal
          visible={error?.visible}
          onClose={() => {
            dispatch(setLoading(false));
            dispatch(setError({ error: null, visible: false }));
          }}
        >
          <Alert
            backgroundColor="white"
            errorMessage={error?.error}
            onPress={() => {
              dispatch(setLoading(false));
              dispatch(setError({ error: null, visible: false }));
            }}
          />
        </Modal>
        <StackNavigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            ...commonScreenOptions,
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          {isAuthenticated && (
            <>
              <Screen name={ROUTES.MAIN} component={MainNavigator} />
              <Screen name={ROUTES.RECIPE} component={Recipe} />
              <Screen name={ROUTES.TRACKER} component={Tracker} />
              <Screen name={ROUTES.PROFILE} component={Profile} />
            </>
          )}

          {!isAuthenticated && (
            <Screen name={ROUTES.AUTH} component={AuthNavigator} />
          )}
        </StackNavigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default Navigator;
