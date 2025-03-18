import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

const banks = [
  "Axis Bank",
  "Bandhan Bank",
  "Bank of Baroda",
  "Bank of India",
  "Bank of Maharastra",
  "Canara Bank",
  "Central Bank of India",
  "Federal Bank",
  "HDFC Bank",
  "ICICI Bank",
  "IDBI Bank",
  "Indian Bank",
  "Induslnd Bank",
  "Panjab National Bank",
  "State Bank of India",
  "Yes Bank",
  "UCO Bank",
];
const accountTypes = ["Savings", "Checking"];

const AddBankDetails = ({ navigation }) => {
  const [selectedBank, setSelectedBank] = useState("Select Bank");
  const [bankDropdown, setBankDropdown] = useState(false);
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(
    "Select Account Type"
  );
  const [accountTypeDropdown, setAccountTypeDropdown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(
      !selectedBank ||
        selectedBank === "Select Bank" ||
        !ifscCode ||
        !accountNumber ||
        !confirmAccountNumber ||
        !beneficiaryName ||
        selectedAccountType === "Select Account Type" ||
        accountNumber !== confirmAccountNumber
    );
  }, [
    selectedBank,
    ifscCode,
    accountNumber,
    confirmAccountNumber,
    beneficiaryName,
    selectedAccountType,
  ]);

  const handleProceed = async () => {
    if (accountNumber !== confirmAccountNumber) {
      Alert.alert("Error", "Account numbers do not match!");
      return;
    }
    const bankDetails = {
      selectedBank,
      ifscCode,
      accountNumber,
      beneficiaryName,
      selectedAccountType,
    };
    try {
      await AsyncStorage.setItem("bankDetails", JSON.stringify(bankDetails));
      Alert.alert("Success", "Bank details saved successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save bank details");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Bank Details</Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.card}>
            <Text style={[styles.label, { textAlign: "center" }]}>
              Bank Detail
            </Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setBankDropdown(!bankDropdown)}
            >
              <Text>{selectedBank}</Text>
              <Ionicons name="chevron-down" size={20} />
            </TouchableOpacity>
            {bankDropdown && (
              <FlatList
                data={banks}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setSelectedBank(item);
                      setBankDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <Text style={styles.label}>IFSC Code</Text>
            <TextInput
              style={styles.input}
              value={ifscCode}
              onChangeText={setIfscCode}
              placeholder="SBIN0010650"
            />
          </View>

          <View style={styles.card}>
            <Text style={[styles.label, { textAlign: "center" }]}>
              Account Detail
            </Text>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              placeholder="Enter Account Number"
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Confirm Account Number</Text>
            <TextInput
              style={styles.input}
              value={confirmAccountNumber}
              placeholder="Confirm Account Number"
              onChangeText={setConfirmAccountNumber}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Beneficiary Name</Text>
            <TextInput
              style={styles.input}
              value={beneficiaryName}
              placeholder="Enter Beneficiary Name"
              onChangeText={setBeneficiaryName}
            />
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setAccountTypeDropdown(!accountTypeDropdown)}
            >
              <Text>{selectedAccountType}</Text>
              <Ionicons name="chevron-down" size={20} />
            </TouchableOpacity>
            {accountTypeDropdown && (
              <FlatList
                data={accountTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      setSelectedAccountType(item);
                      setAccountTypeDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleProceed}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c9000a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // paddingVertical: 15,
    paddingHorizontal: 20,
  },
  wrap: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    flex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderBottomWidth: 1, padding: 5, marginTop: 5 },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    marginTop: 5,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 2,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#c9000a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: { backgroundColor: "gray" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default AddBankDetails;
