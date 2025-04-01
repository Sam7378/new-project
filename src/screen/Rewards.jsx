import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Rewards = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Slide Left Animation
  const startSlideAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: -50,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.wrap}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Redeem Rewards</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>John Doe</Text>
          <Image source={require("../assets/medal.png")} style={styles.medal} />
        </View>

        {/* Cards Section */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Gift")}
          >
            {/* Left: Circular Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/coin1.png")}
                style={styles.cardImage}
              />
            </View>

            {/* Center: Text + Divider + Value */}
            <View style={styles.textContainer}>
              <Text style={styles.cardText}>Earn Points</Text>

              <Text style={styles.cardValue}>0.00</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            {/* Left: Circular Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/coin1.png")}
                style={styles.cardImage}
              />
            </View>

            {/* Center: Text + Divider + Value */}
            <View style={styles.textContainer}>
              <Text style={styles.cardText}>Burn Points</Text>

              <Text style={styles.cardValue}>0.00</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Second Section */}
      <View style={styles.secondSection}>
        <Animated.Image
          source={require("../assets/coinbag.png")}
          style={[
            styles.centeredImage,
            { transform: [{ translateX: slideAnim }] },
          ]}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.trirdSection}>
        <Image
          source={require("../assets/giftstar.png")}
          style={styles.lastImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  wrap: { backgroundColor: "#c9000a" },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },

  // User Info
  userInfo: {
    flexDirection: "row",
    left: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },
  medal: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },

  // Card Section
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
    elevation: 5,
  },

  // Circular Image
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 0.3,
    borderColor: "#000",
  },
  cardImage: {
    width: 35,
    height: 35,
  },

  // Text Container
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardText: { fontSize: 13, fontWeight: "500", color: "#000" },

  // Horizontal Divider
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
    marginVertical: 5,
  },

  cardValue: { fontSize: 18, fontWeight: "bold", color: "#000" },

  // Second Section (White Background)
  secondSection: {
    backgroundColor: "#fff",
    left: 40,
    paddingVertical: 18,
  },
  trirdSection: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 18,
  },
  centeredImage: { width: 100, height: 100, marginBottom: 10 },
  lastImage: { width: 60, height: 60, marginBottom: 10 },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 5,
  },
});

export default Rewards;
