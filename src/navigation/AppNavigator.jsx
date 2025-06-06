import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Splash from "../screen/Splash";
import WelcomeScreen from "../screen/WelcomeScreen";
import ProfileSelectionScreen from "../screen/ProfileSelectionScreen";

import DistributorScreen from "../screen/DistributorScreen";
import SignUpScreen from "../screen/SignUpScreen";
import OTPScreen from "../screen/OTPScreen";
import BottomTabs from "./BottomTabs";
import ScanScreen from "../screen/ScanScreen";
import DrawerNavigator from "../drawer/DrawerNavigator";
import ProductCatalogue from "../screen/ProductCatalogue";
import ReportAnIssue from "../screen/ReportAnIssue";
import HelpSupportScreen from "../screen/HelpSupportScreen";
import Rewards from "../screen/Rewards";
import FeedbackScreen from "../screen/FeedbackScreen";
import BankAccountScreen from "../screen/BankAccountScreen";
import AddBankDetails from "../components/AddBankDetails";
import BankAccount from "../components/BankAccount";
import UpiAddressScreen from "../screen/UpiAddressScreen";
import PointsEarnHistory from "../components/PointsEarnHistory";
import GiftRedeemedHistory from "../components/GiftRedeemedHistory";
import CashbackHistory from "../components/CashbackHistory";
import ReportIssueScreen from "../screen/ReportIssueScreen";
import NotificationScreen from "../screen/NoticicationScreen";
import ProfileScreen from "../screen/ProfileScreen";
import EditProfileScreen from "../screen/EditProfileScreen";
import RetailerLoginScreen from "../screen/LoginScreen";
import GalleryScreen from "../screen/GalleryScreen";
import MediaScreen from "../screen/MediaScreen";
import VideosScreen from "../screen/VideosScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Splash");

  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        const firstTime = await AsyncStorage.getItem("firstTimeUser");
        const storedProfile = await AsyncStorage.getItem("profileSelected");
        const userToken = await AsyncStorage.getItem("userToken");

        if (!firstTime || firstTime !== "completed") {
          setInitialRoute("Welcome");
        } else if (!userToken) {
          setInitialRoute("Retailer");
        } else if (!storedProfile) {
          setInitialRoute("ProfileSelection");
        } else {
          setInitialRoute("MainApp");
        }
      } catch (error) {
        console.error("Error checking app status:", error);
        setInitialRoute("Welcome");
      } finally {
        setLoading(false);
      }
    };

    checkAppStatus();
  }, []);

  if (loading) return <Splash />;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="ProfileSelection"
        component={ProfileSelectionScreen}
      />
      <Stack.Screen name="Distributor" component={DistributorScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="OtpScreen" component={OTPScreen} />
      <Stack.Screen name="Retailer" component={RetailerLoginScreen} />
      <Stack.Screen name="MainApp">
        {(props) => (
          <DrawerNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>

      {/* Shared Screens */}
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="BankAccountScreen" component={BankAccountScreen} />
      <Stack.Screen name="ProductCatalogue" component={ProductCatalogue} />
      <Stack.Screen name="ReportAnIssue" component={ReportAnIssue} />
      <Stack.Screen name="Help" component={HelpSupportScreen} />
      <Stack.Screen name="Reward" component={Rewards} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="BankDetails" component={AddBankDetails} />
      <Stack.Screen name="Bank" component={BankAccount} />
      <Stack.Screen name="UPIAddress" component={UpiAddressScreen} />
      <Stack.Screen name="Point" component={PointsEarnHistory} />
      <Stack.Screen name="Gift" component={GiftRedeemedHistory} />
      <Stack.Screen name="Cashback" component={CashbackHistory} />
      <Stack.Screen name="Issue" component={ReportIssueScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Editprofile" component={EditProfileScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
      <Stack.Screen name="Videos" component={VideosScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
