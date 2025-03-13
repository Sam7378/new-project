import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Path } from "react-native-svg";
import ScanScreen from "../screen/ScanScreen";
import HomeScreen from "../screen/HomeScreen";
import PassbookScreen from "../screen/PassbookScreen";

const { width } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => {
  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={90} viewBox={`0 0 ${width} 90`} fill="white">
        <Path
          d={`
            M0,20 
            H${width * 0.4} 
            Q${width * 0.5},-10 ${width * 0.6},20 
            H${width} 
            V90 
            H0 
            Z
          `}
          fill="white"
        />
      </Svg>
    </View>
  );
};

const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#bd1422",
        tabBarInactiveTintColor: "#bd1422",

        tabBarStyle: {
          height: 90,
          backgroundColor: "transparent",
          marginBottom: 20,
          possition: "absolute",
          elevation: 0,
        },
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          marginTop: -30,
          color: "black",
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={32}
            />
          ),
        }}
      />

      {/* Passbook Tab */}
      <Tab.Screen
        name="Passbook"
        component={PassbookScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    backgroundColor: "transparent",
  },
});
