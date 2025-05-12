import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UpiAddressScreen = () => {
  const navigation = useNavigation();
  const [upiAddress, setUpiAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleVerify = async () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;

    if (!upiAddress) {
      Alert.alert("Error", "Please enter a valid UPI ID");
      return;
    }

    if (!upiRegex.test(upiAddress)) {
      Alert.alert("Error", "Invalid UPI ID format");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      await AsyncStorage.setItem("upiaddress", upiAddress);
      setLoading(false);
      Alert.alert("Success", "Verified Successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Bank"),
        },
      ]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Enter UPI Address</Text>
      </View>

      {/* UPI Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your UPI ID"
          value={upiAddress}
          onChangeText={setUpiAddress}
          placeholderTextColor="#999"
        />
      </View>

      {/* Add Account Button */}
      <View style={styles.addAccountContainer}>
        <Text style={styles.dontHaveUpiText}>don't have UPI?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("BankDetails")}>
          <Text style={styles.addAccountText}> add account detail</Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <View style={styles.verifyButtonContainer}>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.verifyText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c9000a",
    padding: 30,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  inputContainer: { marginVertical: 20, paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  addAccountContainer: {
    flexDirection: "row",

    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  dontHaveUpiText: {
    color: "#b8b8b8",
    fontSize: 13,
    fontWeight: "500",
  },
  addAccountText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  verifyButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  verifyButton: {
    backgroundColor: "#c9000a",
    padding: 15,
    borderRadius: 3,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
  },
  verifyText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default UpiAddressScreen;
