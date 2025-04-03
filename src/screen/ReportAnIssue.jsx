import React from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReportAnIssue = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Query List</Text>
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
      <Text style={styles.addAccountText}>Add Issue</Text>

      <TouchableOpacity
        style={styles.addButtonCircle}
        onPress={() => navigation.navigate("Issue")}
      >
        <MaterialIcons name="add" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ca000b",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#fff",
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
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  noDataContainer: {
    alignItems: "center",
    marginTop: 100,
    marginTop: 300,
  },
  noDataText: { fontSize: 20, color: "#000", fontWeight: "bold" },
  addButtonCircle: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#c9000a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "orange",
  },
  addAccountText: {
    position: "absolute",
    bottom: 30,
    left: 170,
    fontSize: 18,
    fontWeight: "bold",
    color: "#c9000a",
  },
});
export default ReportAnIssue;
