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
import BottomTabs from "./BottomTabs";
import ScanScreen from "../screen/ScanScreen";
import DrawerNavigator from "../drawer/DrawerNavigator";
import BankAccount from "../screen/BankAccountScreen";
import ProductCatalogue from "../screen/ProductCatalogue";
import ReportAnIssue from "../screen/ReportAnIssue";
import HelpSupportScreen from "../screen/HelpSupportScreen";
import Rewards from "../screen/Rewards";
import FeedbackScreen from "../screen/FeedbackScreen";
import BankAccountScreen from "../screen/BankAccountScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Welcome"); // Default to Welcome screen

  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        console.log("Checking app status...");
        const firstTime = await AsyncStorage.getItem("firstTimeUser");
        const storedProfile = await AsyncStorage.getItem("profileSelected");

        if (firstTime !== "completed") {
          setInitialRoute("Welcome");
        } else if (
          storedProfile === "Retailer" ||
          storedProfile === "Distributor"
        ) {
          setInitialRoute("MainApp"); // Navigate to Bottom Tabs after login
        } else {
          setInitialRoute("ProfileSelection");
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
    return <Splash />;
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
      <Stack.Screen name="MainApp">
        {(props) => (
          <DrawerNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen name="ProductCatalogue" component={ProductCatalogue} />
      <Stack.Screen name="ReportAnIssue" component={ReportAnIssue} />
      <Stack.Screen name="Help" component={HelpSupportScreen} />
      <Stack.Screen name="Reward" component={Rewards} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
