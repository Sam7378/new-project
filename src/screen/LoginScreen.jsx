import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

const RetailerLoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const validateMobile = (number) => /^[0-9]{10}$/.test(number);

  const handleLogin = async () => {
    if (!mobileNumber || !name) {
      Alert.alert("Error", "Please enter mobile number and name.");
      return;
    }
    if (!validateMobile(mobileNumber)) {
      Alert.alert("Invalid Number", "Enter a valid 10-digit mobile number.");
      return;
    }
    if (!isChecked) {
      Alert.alert("Terms & Conditions", "Please agree to the terms.");
      return;
    }

    await AsyncStorage.setItem("retailerMobile", mobileNumber);
    await AsyncStorage.setItem("retailerName", name);
    await AsyncStorage.setItem("userToken", "validToken");

    Alert.alert("Success", "Login Successful", [
      { text: "OK", onPress: requestLocationPermission },
    ]);
  };

  const requestLocationPermission = async () => {
    const result = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (result === RESULTS.GRANTED) {
      navigation.replace("MAIN");
    } else if (result === RESULTS.DENIED) {
      Alert.alert("Permission Denied", "Location access is required.");
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        "Permission Blocked",
        "Please enable location access in settings.",
        [
          { text: "Open Settings", onPress: openSettings },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/demohead.png")}
          style={styles.headerImage}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SIGNUP")}
          style={styles.registerButton}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Tell us your mobile number</Text>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Mobile Number</Text>

        <TextInput
          style={styles.input}
          // placeholder="Mobile Number"
          keyboardType="phone-pad"
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>
      <TextInput
        label="Name"
        style={styles.input}
        // placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkBoxColor="red"
        />
        <Text style={styles.checkboxText}>
          I agree to the Terms & Conditions
        </Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
        <Icon
          style={styles.rightArrow}
          name="arrowright"
          size={22}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RetailerLoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerImage: { width: 120, height: 50, resizeMode: "contain" },
  registerButton: {
    backgroundColor: "#171717",
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  registerText: { fontSize: 18, color: "#ffffff", fontWeight: "bold" },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#171717",
    marginBottom: 55,
    marginTop: 45,
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 22,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 20,
  },
  checkboxText: { marginLeft: 8, fontSize: 18, color: "#555" },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#c91212",
    width: "60%",
    padding: 17,
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 50,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  rightArrow: {
    marginLeft: 2,
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 15,
    padding: 5,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    fontSize: 14,
    color: "gray",
  },
  input: {
    fontSize: 16,
    paddingTop: 10,
  },
});
