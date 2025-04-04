import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../drawer/CustomDrawer";

import MyStatusScreen from "../screen/MyStatusScreen";
import AccountScreen from "../screen/AccountScreen";
import BottomTabs from "../navigation/BottomTabs";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} onLogout={handleLogout} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#fff" },
      }}
    >
      <Drawer.Screen name="Main" component={BottomTabs} />
      {/* <Drawer.Screen name="MyStatus" component={MyStatusScreen} /> */}
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
