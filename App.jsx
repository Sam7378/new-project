import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import { UserProvider } from "./src/context/UserContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator setIsLoggedIn={setIsLoggedIn} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
};

export default App;
