import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../screen/Splash";
import WelcomeScreen from "../screen/WelcomeScreen";
import ProfileSelectionScreen from "../screen/ProfileSelectionScreen";
import RetailerScreen from "../screen/RetailerScreen";
import DistributorScreen from "../screen/DistributorScreen";
import SignUpScreen from "../screen/SignUpScreen";
import OTPScreen from "../screen/OTPScreen";
import HomeScreen from "../screen/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Welcome"); // Default to Welcome screen

  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        console.log("Checking app status...");
        const firstTime = await AsyncStorage.getItem("firstTimeUser");
        const storedProfile = await AsyncStorage.getItem("profileSelected");

        if (firstTime !== "completed") {
          setInitialRoute("Welcome"); // New user starts from Welcome
        } else if (storedProfile === "Retailer") {
          setInitialRoute("Retailer");
        } else if (storedProfile === "Distributor") {
          setInitialRoute("Distributor");
        } else {
          setInitialRoute("ProfileSelection"); // If no profile is selected, go to ProfileSelection
        }
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAppStatus();
  }, []);

  if (loading) {
    return <Splash />; // Show splash screen while checking AsyncStorage
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute} // Set the starting screen dynamically
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="ProfileSelection"
        component={ProfileSelectionScreen}
      />
      <Stack.Screen name="Retailer" component={RetailerScreen} />
      <Stack.Screen name="Distributor" component={DistributorScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="OtpScreen" component={OTPScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
