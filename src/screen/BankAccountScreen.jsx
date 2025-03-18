import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BankAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>Bank Account</Text> */}
        <Text style={styles.title}>Add Bank & UPI</Text>
      </View>

      {/* Add Bank & UPI */}
      <View style={styles.wrap}>
        <Text style={styles.sectionTitle}>Select Method</Text>
        {/* First Section */}
        <View style={[styles.devider, { marginHorizontal: 15 }]} />
        <TouchableOpacity onPress={() => navigation.navigate("BankDetails")}>
          <View style={styles.section}>
            <View style={styles.circle}>
              <Image
                source={require("../assets/bank.png")} // Replace with actual image
                style={styles.icon}
              />
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.boldText}>Account Number</Text>
                <Text style={styles.subText}>
                  Transfer without adding a beneficiary
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={38} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.devider, { marginHorizontal: 15 }]} />
        {/* Second Section (Similar to First) */}
        <TouchableOpacity>
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Select Method</Text> */}
            <View style={styles.circle}>
              <Image
                source={require("../assets/upi1.png")} // Replace with actual image
                style={styles.icon}
              />
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.boldText}>
                  Unfined Payments Interface (UPI)
                </Text>
                <Text style={styles.subText}>Transfer through UPI ID</Text>
              </View>
              <MaterialIcons name="chevron-right" size={38} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.devider,
            {
              height: 0.5,
              backgroundColor: "#999",
              marginHorizontal: 15,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default BankAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9000a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    // paddingVertical: 15,
    paddingHorizontal: 20,
  },
  devider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15,
    marginLeft: 12,
    color: "#ffffff",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
    textAlign: "center",
  },
  wrap: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    flex: 1,
  },
  circle: {
    width: 50, // Outer circle size
    height: 50,
    borderRadius: 25, // Half of width/height to make it circular
    backgroundColor: "#fff", // Light gray background (you can change this)
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.3,
    marginRight: 10,
    overflow: "hidden",
  },
  icon: {
    width: 55, // Adjust size as needed
    height: 30,

    resizeMode: "contain",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#292626",
  },
  subText: {
    fontSize: 10,
    color: "gray",
  },
});
