import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import BannerCarousel from "../components/BannerCarousel";
import BalanceSection from "../components/BalanceSection";
import FeatureGrid from "../components/FeatureGrid";
import DipsComponent from "../components/DipsComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("Sam");
  return (
    <ScrollView>
      <Header navigation={navigation} />
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome {username}</Text>
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
