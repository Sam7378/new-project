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

const { width } = Dimensions.get("window");

// Screens

const PassbookScreen = () => (
  <View style={styles.screen}>
    <Text>📘 Passbook</Text>
  </View>
);

const Tab = createBottomTabNavigator();

// Custom Bottom Tab Background with Only the Scan Section Raised
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
        tabBarStyle: { height: 90, backgroundColor: "transparent" },
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        headerShown: false,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={32}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Scan Tab (Middle Section Dips Up) */}
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
              <MaterialCommunityIcons
                name="barcode-scan"
                color={color}
                size={32}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Passbook Tab */}
      <Tab.Screen
        name="Passbook"
        component={PassbookScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Passbook")}>
              <MaterialCommunityIcons
                name="book-outline"
                color={color}
                size={32}
              />
            </TouchableOpacity>
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
    height: 90, // Taller to accommodate the dip
    backgroundColor: "transparent",
  },
});
