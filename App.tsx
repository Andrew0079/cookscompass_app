import React from "react";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Navigator from "./src/screens/navigators/navigator";
Amplify.configure(config);

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
