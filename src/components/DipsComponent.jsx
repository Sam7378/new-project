import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const dipsData = [
  {
    id: 1,
    label: "Rewards",
    image: require("../assets/wel2.png"),
    bgColor: "#dbc6b3",
    screen: "Reward",
  },
  {
    id: 2,
    label: "Customer Support",
    image: require("../assets/wel2.png"),
    bgColor: "#beb5e0",
    screen: "Help",
  },
  {
    id: 3,
    label: "Feedback",
    image: require("../assets/wel2.png"),
    bgColor: "#dbc7c8",
    screen: "Feedback",
  },
];

const DipsComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.dipsContainer}>
      {dipsData.map((item) => (
        <View key={item.id} style={styles.dip}>
          {/* Button with Merged Shape */}
          <TouchableOpacity
            style={[styles.mergedShape, { backgroundColor: item.bgColor }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            {/* Circular Image Inside */}
            <View style={styles.innerCircle}>
              <Image source={item.image} style={styles.dipImage} />
            </View>
            <Text style={styles.circleText}>{item.label}</Text>
          </TouchableOpacity>

          {/* Text Below */}
        </View>
      ))}
    </View>
  );
};

export default DipsComponent;

const styles = StyleSheet.create({
  dipsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    gap: 10,
  },
  dip: {
    alignItems: "center",
  },
  mergedShape: {
    width: 100, // Fixed width
    height: 150, // Fixed height
    borderTopLeftRadius: 100, // Semicircle effect
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 10, // Slight rounding for rectangle part
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 35, // Perfect circle
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    top: 18,
  },
  dipImage: {
    width: 75,
    height: 40,
    borderRadius: 35,
  },
  circleText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "900",
    color: "#18100e",
    textAlign: "center",
    fontFamily: "sans-serif",
    top: 40,
  },
});
