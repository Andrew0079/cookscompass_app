import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Navigator from "./src/screens/navigators/navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
