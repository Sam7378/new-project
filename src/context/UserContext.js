import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const loadUser = async () => {
  //   const data = await AsyncStorage.getItem("userDetails");
  //   if (data) setUser(JSON.parse(data));
  // };

  const updateUser = async (newData) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify(newData));
    setUser(newData);
  };
  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const profileSelected = await AsyncStorage.getItem("profileSelected");
      const firstTime = await AsyncStorage.getItem("firstTimeUser");
      const userDetails = await AsyncStorage.getItem("userDetails");
      setUserToken(token);
      setProfile(profileSelected);
      setIsFirstTimeUser(firstTime);
      if (userDetails) setUser(JSON.parse(userDetails));
    } catch (error) {
      console.log("error loading user data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (token, userData = null) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("firstTimeUser", "completed");
      setUserToken(token);
      setIsFirstTimeUser("completed");

      if (userData) {
        await AsyncStorage.setItem("userDetails", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const selectProfile = async (selectedProfile) => {
    await AsyncStorage.setItem("profileSelected", selectedProfile);
    setProfile(selectedProfile);
  };
  const updateProfileImage = async (imageUri) => {
    const updatedUser = { ...user, profileImage: imageUri };
    await AsyncStorage.setItem("userDetails", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([
      "userToken",
      "profileSelected",
      "userDetails",
      "firstTimeUser",
    ]);
    setUser(null);
    setUserToken(null);
    setProfile(null);
    setIsFirstTimeUser(null);
  };

  // useEffect(() => {
  //   loadUser();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        userToken,
        profile,
        isFirstTimeUser,
        loading,
        login,
        selectProfile,
        updateProfileImage,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
