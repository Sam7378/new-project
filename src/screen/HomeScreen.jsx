import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import BannerCarousel from "../components/BannerCarousel";
import BalanceSection from "../components/BalanceSection";
import FeatureGrid from "../components/FeatureGrid";
import DipsComponent from "../components/DipsComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storeData = await AsyncStorage.getItem("userDetails");
        console.log("fetched home", storeData);
        if (storeData) {
          const parseData = JSON.parse(storeData);
          setUserData(parseData);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <ScrollView>
      <Header navigation={navigation} />
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Welcome {user?.firstName || "Guest"}
        </Text>
        <MaterialIcons
          name="military-tech"
          size={24}
          color="gold"
          style={styles.medalIcon}
        />
      </View>
      <BannerCarousel />
      <BalanceSection />
      <FeatureGrid navigation={navigation} />
      <DipsComponent navigation={navigation} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ca000b",
    marginLeft: 10,
  },
  medalIcon: { marginLeft: 5 },
});
