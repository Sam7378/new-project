import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="list" size={30} color="#d15560" />
      </TouchableOpacity>
      <Image source={require("../assets/demohead.png")} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <FontAwesome name="bell" size={30} color="#ca000b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  logo: { width: 100, height: 40 },
});

export default Header;
