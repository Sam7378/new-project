import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("userDetails");
    if (data) setUser(JSON.parse(data));
  };

  const updateUser = async (newData) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify(newData));
    setUser(newData);
  };

  const updateProfileImage = async (newData) => {
    // const updatedUser = { ...user, profileImage: imageUri };
    await AsyncStorage.setItem("userDetails", JSON.stringify(newData));
    setUser(newData);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
