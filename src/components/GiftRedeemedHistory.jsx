import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const GiftRedeemedHistory = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Point History</Text>
      </View>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <View style={styles.pointRow}>
          <View>
            <Text style={styles.subtitle}>You Have</Text>
            <Text style={styles.pointsValue}>0.00</Text>
            <Text style={[styles.pointText, { marginLeft: 5 }]}>
              Balance Points
            </Text>
          </View>
          <View style={styles.imagePoint}>
            <Image
              source={require("../assets/giftcoin.png")}
              style={styles.pointImage}
            />
          </View>
        </View>
      </View>

      {/* Lifetime Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0.00</Text>
          <Text style={styles.statLabel}>Lifetime{"\n"}Earnings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0.00</Text>
          <Text style={styles.statLabel}>Lifetime Burns</Text>
        </View>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemText}>redeem</Text>
        </TouchableOpacity>
      </View>

      {/* No Data Placeholder */}
      <View style={styles.noDataContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="gray" />
        <Text style={styles.noDataText}>No Data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: 16 },
  pointsSection: { marginBottom: 16 },
  subtitle: { fontSize: 16, color: "#343434" },
  pointsValue: { fontSize: 32, fontWeight: "900", color: "#000" },
  pointRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointText: { fontSize: 18, color: "#343434" },
  imagePoint: {
    marginRight: 30,
  },
  pointImage: { width: 130, height: 130 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  statItem: { alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: 18, fontWeight: "900", color: "#000" },
  statLabel: { fontSize: 14, color: "#343434", fontWeight: "400" },

  redeemButton: {
    marginTop: 25,
    backgroundColor: "#fece00",
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 3,
    marginBottom: 10,

    justifyContent: "center",
  },
  submitText: { color: "#fff", fontSize: 25 },

  noDataContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  noDataText: { fontSize: 16, color: "gray" },
});

export default GiftRedeemedHistory;
