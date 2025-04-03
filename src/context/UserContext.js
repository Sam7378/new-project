import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) setProfileImage(storedImage);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateProfileImage = async (newImageUri) => {
    try {
      await AsyncStorage.setItem("profileImage", newImageUri);
      setProfileImage(newImageUri);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <UserContext.Provider value={{ profileImage, updateProfileImage, loading }}>
      {children}
    </UserContext.Provider>
  );
};
