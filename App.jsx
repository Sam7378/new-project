import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import { UserProvider } from "./src/context/UserContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { SafeAreaView } from "react-native";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    // <Provider store={store}>
    //   <GestureHandlerRootView style={{ flex: 1 }}>
    //     <NavigationContainer>
    //       <SafeAreaView style={{ flex: 1 }}>
    //         <AppNavigator setIsLoggedIn={setIsLoggedIn} />
    //       </SafeAreaView>
    //     </NavigationContainer>
    //   </GestureHandlerRootView>
    // </Provider>

    <ThemeProvider>
      <UserProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigator setIsLoggedIn={setIsLoggedIn} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
