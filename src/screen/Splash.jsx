import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";

const Splash = ({ navigation }) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    try {
      SplashScreen.hide();
    } catch (error) {
      console.error("SplashScreen.hide() failed:", error);
    }

    timeoutRef.current = setTimeout(() => {
      navigation.replace("Login");
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});

export default Splash;
