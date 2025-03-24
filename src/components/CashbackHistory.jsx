import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CashbackHistory = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("Regular Points");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cashback History</Text>
      </View>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <View style={styles.pointRow}>
          <Text style={styles.subtitle}>Wallet balance</Text>
          <Text style={styles.pointsValue}>0.00</Text>
        </View>
      </View>

      {/* Points Category Selector */}
      <View style={styles.categoryRow}>
        <TouchableOpacity onPress={() => setActiveCategory("Regular Points")}>
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Regular Points" && styles.activeCategoryText,
            ]}
          >
            Transactions
          </Text>
          {activeCategory === "Regular Points" && (
            <View style={styles.fullUnderline} />
          )}
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => setActiveCategory("Extra Points")}>
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Extra Points" && styles.activeCategoryText,
            ]}
          >
            Wallet
          </Text>
          {activeCategory === "Extra Points" && (
            <View style={styles.fullUnderline} />
          )}
        </TouchableOpacity>
      </View>

      {/* No Data Placeholder */}
      <View style={styles.noDataContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="gray" />
        <Text style={styles.noDataText}>No Data Found</Text>
        <Text>Data is empty</Text>
      </View>

      {/* Back to Dashboard Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
          <Ionicons name="arrow-forward" color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CashbackHistory;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: 16 },

  pointsSection: { alignItems: "center", padding: 8 },
  subtitle: { fontSize: 16, color: "#343434" },
  pointsValue: { fontSize: 16, fontWeight: "600", color: "#343434" },

  pointRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 10,
  },

  button: {
    alignItems: "center",
    marginTop: 60,
    padding: 15,
    backgroundColor: "#808080",
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10, // Adds spacing between text and icon
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  activeCategoryText: { color: "red", fontWeight: "bold" },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,

    paddingBottom: 8,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  categoryText: { fontSize: 15, color: "#000", paddingBottom: 5 },
  activeCategoryText: {
    color: "red",
    fontWeight: "bold",
    borderBottomWidth: 2, // Add red underline
    borderBottomColor: "red",
    paddingBottom: 5, // Align underline properly
  },

  divider: { width: 1, backgroundColor: "gray", height: "100%" }, // Fixed height

  noDataContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  noDataText: { fontSize: 20, color: "#000", fontWeight: "bold" },
});
