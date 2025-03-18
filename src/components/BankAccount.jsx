import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";

const BankAccount = () => {
  const navigation = useNavigation();
  const [bankDetails, setBankDetails] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const data = await AsyncStorage.getItem("bankDetails");
        if (data) {
          setBankDetails(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load bank details");
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchBankDetails);
    return unsubscribe;
  }, [navigation]);

  const deleteBankDetails = async () => {
    if (!selectedBank) {
      Alert.alert("Alert", "Please select bank detail");
      return;
    }
    try {
      await AsyncStorage.removeItem("bankDetails");
      setBankDetails(null);
      setSelectedBank(null);
      Alert.alert("Success", "Bank details deleted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to delete bank details");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Bank Account</Text>
      </View>

      {/* Content */}
      <View style={styles.wrap}>
        <Text style={styles.sectionTitle}>Preferred Method</Text>
        <View style={styles.divider} />

        {/* Show Saved Bank Details */}
        {bankDetails ? (
          <View style={styles.bankCard}>
            <View style={styles.bankInfo}>
              <View>
                <Text style={styles.bankText}>
                  <Text style={styles.boldText}>Bank:</Text>{" "}
                  {bankDetails.selectedBank}
                </Text>
                <Text style={styles.bankText}>
                  <Text style={styles.boldText}>IFSC Code:</Text>{" "}
                  {bankDetails.ifscCode}
                </Text>
                <Text style={styles.bankText}>
                  <Text style={styles.boldText}>Account Number:</Text>{" "}
                  {bankDetails.accountNumber}
                </Text>
                <Text style={styles.bankText}>
                  <Text style={styles.boldText}>Beneficiary:</Text>{" "}
                  {bankDetails.beneficiaryName}
                </Text>
                <Text style={styles.bankText}>
                  <Text style={styles.boldText}>Account Type:</Text>{" "}
                  {bankDetails.selectedAccountType}
                </Text>
              </View>

              {/* Radio Button and Delete Icon */}
              <View style={styles.rightSection}>
                <RadioButton
                  value={bankDetails.selectedBank}
                  status={
                    selectedBank === bankDetails.selectedBank
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    setSelectedBank((prev) =>
                      prev === bankDetails.selectedBank
                        ? null
                        : bankDetails.selectedBank
                    )
                  }
                />
                <TouchableOpacity onPress={deleteBankDetails}>
                  <MaterialIcons
                    name="delete"
                    size={28}
                    color={selectedBank ? "red" : "grey"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.noAccountText}>No bank details added yet</Text>
        )}

        {/* Floating Add Button */}
        <Text style={styles.addAccountText}>Add Account</Text>

        <TouchableOpacity
          style={styles.addButtonCircle}
          onPress={() => navigation.navigate("BankDetails")}
        >
          <MaterialIcons name="add" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BankAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9000a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#ffffff",
  },
  wrap: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
    textAlign: "center",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#999",
    marginHorizontal: 15,
  },
  bankCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginVertical: 15,
  },
  bankInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  noAccountText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
  },
  addAccountText: {
    position: "absolute",
    bottom: 30,
    left: 210,
    fontSize: 18,
    fontWeight: "bold",
    color: "#c9000a",
  },
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
});
