import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../drawer/CustomDrawer";
import AccountScreen from "../screen/AccountScreen";
import BottomTabs from "../navigation/BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken"]);
      // await AsyncStorage.setItem("firstTimeUser", "completed");
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Retailer" }],
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
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
