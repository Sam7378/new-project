import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, Text } from "react-native";
import { CartProvider, CartContext } from "../context/CartContext";
import HomeScreen from "../screen/HomeScreen";
import ProductDetailsScreen from "../screen/ProductDetailsScreen";
import CartScreen from "../screen/CartScreen";
import ReorderScreen from "../screen/ReorderScreen";
import AccountScreen from "../screen/AccountScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

// Separate cart icon component to avoid hook issues
const CartIcon = ({ focused, size }) => {
  const { cartItems } = React.useContext(CartContext);
  const iconSource = focused
    ? require("../assets/focused/shopping_cart.png")
    : require("../assets/normal/shopping_cart.png");

  const badgeColor = focused ? "#E96E6E" : "#C0C0C0";

  return (
    <View style={{ position: "relative" }}>
      <Image
        source={iconSource}
        style={{ height: size, width: size, resizeMode: "center" }}
      />
      {cartItems.length > 0 && (
        <View
          style={{
            position: "absolute",
            right: -3,
            bottom: 22,
            height: 14,
            width: 14,
            backgroundColor: badgeColor,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const BottomTabs = ({ setIsLoggedIn }) => (
  <CartProvider>
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="HOME_STACK"
        component={MyHomeStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/focused/home.png")
                  : require("../assets/normal/home.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="REORDER"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/tracking2.png")
                  : require("../assets/tracking1.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CART"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <CartIcon focused={focused} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ACCOUNT"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/focused/account.png")
                  : require("../assets/normal/account.png")
              }
              style={{ height: size, width: size, resizeMode: "center" }}
            />
          ),
        }}
      >
        {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  </CartProvider>
);

export default BottomTabs;
