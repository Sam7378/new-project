import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage when app starts
    const loadUserData = async () => {
      const storedUser = await AsyncStorage.getItem("userDetails");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUserData();
  }, []);

  const registerUser = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error("Error saving user data:", error);
      return { success: false, error: "Failed to save user data" };
    }
  };

  const login = async (mobileNumber, username) => {
    try {
      const storedUser = await AsyncStorage.getItem("userDetails"); // Ensure key is correct

      if (!storedUser) {
        Alert.alert("Error", "User not found. Please register first.");
        return false;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        parsedUser.mobileNumber === mobileNumber &&
        parsedUser.firstName === username
      ) {
        setUser(parsedUser);
        await AsyncStorage.setItem("isLoggedIn", "true");
        return true;
      } else {
        Alert.alert("Error", "Invalid username or mobile number.");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
