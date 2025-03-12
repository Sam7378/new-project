import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BalanceSection = () => {
  return (
    <View style={styles.balanceSection}>
      <View style={styles.balanceValue}>
        <Text style={styles.balanceText}>Balance {"\n"} Points</Text>
        <Text style={styles.balanceText}>1200</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.balanceText}>Current Month {"\n"}Points</Text>
        <Text style={styles.balanceText}>300</Text>
      </View>
      <TouchableOpacity style={styles.redeemButton}>
        <Text style={styles.redeemText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  redeemButton: {
    backgroundColor: "#ca000b",
    padding: 10,
    borderRadius: 5,
    width: 90,
    alignItems: "center",
  },
  redeemText: { color: "#fff", fontWeight: "600" },
});

export default BalanceSection;
