import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileSelectionScreen = () => {
  const navigation = useNavigation();

  const selectProfile = async (profile) => {
    try {
      await AsyncStorage.setItem("profileSelected", profile);
      navigation.navigate(profile); // ✅ Navigate to the selected profile
    } catch (error) {
      console.error("Error storing profile selection:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/demohead.png")}
        style={styles.headerImage}
      />

      <View style={styles.redLine} />
      <Text style={styles.title}>Choose Your Profile</Text>
      <View style={styles.redLine} />

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => selectProfile("Retailer")}
        >
          <Image
            source={require("../assets/retailer.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>RETAILER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => selectProfile("Distributor")}
        >
          <Image
            source={require("../assets/dist.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>DISTRIBUTOR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          Designed and developed by Genefied
        </Text>
      </View>
    </View>
  );
};

export default ProfileSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  headerImage: { width: 176, height: 73, resizeMode: "contain", opacity: 1 },
  redLine: {
    width: "70%",
    height: 1.5,
    backgroundColor: "#c9125f",
    marginVertical: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#171717",
    textAlign: "center",
    marginTop: 2,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    width: 160,
    elevation: 5,
  },
  cardImage: { width: 60, height: 70, resizeMode: "contain" },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    color: "#B0B0B0",
  },
  footer: { marginTop: 30 },
  footerTitle: { fontSize: 15, color: "#171717", fontWeight: "500" },
});
