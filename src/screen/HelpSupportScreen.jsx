import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL("in-customer.service@bata.com");
  };

  const handleCallPress = () => {
    Linking.openURL("tel:1234567890");
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.headerTitle}>Help and Support</Text>
        </TouchableOpacity>
      </View>

      {/* Support Image */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/help2.jpg")} style={styles.image} />
      </View>

      {/* Mail Support */}
      <View style={styles.helpContainer}>
        <TouchableOpacity style={styles.supportCard} onPress={handleEmailPress}>
          <Fontisto name="email" size={36} color="#fff" style={styles.icon} />
          <View>
            <Text style={styles.supportText}>Mail Us</Text>
            <Text style={styles.supportDetail}>
              in-customer.service@bata.com
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* Call Support */}
        <TouchableOpacity style={styles.supportCard} onPress={handleCallPress}>
          <Feather
            name="phone-call"
            size={36}
            color="#fff"
            style={styles.icon}
          />
          <View>
            <Text style={styles.supportText}>Call Us</Text>
            <Text style={styles.supportDetail}>1234567890</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    left: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  helpContainer: {
    width: "100%",
    backgroundColor: "#ca000b",
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  supportCard: {
    alignItems: "center",

    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  supportText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  supportDetail: {
    fontSize: 16,
    color: "#ffffff",
  },
  divider: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
    opacity: 0.5,
  },
});

export default HelpSupportScreen;
