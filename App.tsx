import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Navigator from "./src/screens/navigators/navigator";

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
