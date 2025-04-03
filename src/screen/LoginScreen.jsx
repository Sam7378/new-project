import React, { useContext, useEffect, useState } from "react";
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
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

const RetailerLoginScreen = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [storedUser, setStoredUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getStoredUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userDetail");
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching stored user data:", error);
      }
    };

    getStoredUser();
  }, []);

  const validateMobile = (number) => /^[0-9]{10}$/.test(number.trim());

  const handleLogin = async () => {
    const trimmedMobile = mobileNumber.trim();
    const trimmedUsername = username.trim();

    if (!trimmedMobile || !trimmedUsername) {
      Alert.alert("Error", "Please enter mobile number and name.");
      return;
    }

    if (!validateMobile(trimmedMobile)) {
      Alert.alert("Invalid Number", "Enter a valid 10-digit mobile number.");
      return;
    }

    if (!isChecked) {
      Alert.alert("Terms & Conditions", "Please agree to the terms.");
      return;
    }

    try {
      const storedUserData = await AsyncStorage.getItem("userDetails"); // Corrected key
      if (!storedUserData) {
        Alert.alert("Error", "User not found. Please register first.");
        return;
      }

      const storedUser = JSON.parse(storedUserData);

      if (
        storedUser.mobileNumber === trimmedMobile &&
        storedUser.firstName === trimmedUsername
      ) {
        await login(trimmedMobile, trimmedUsername); // Call login from AuthContext
        Alert.alert("Success", "Login Successful", [
          { text: "OK", onPress: requestLocationPermission },
        ]);
      } else {
        Alert.alert("Error", "Invalid username or mobile number.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);
    if (status === RESULTS.GRANTED) {
      navigation.replace("MAIN");
      return;
    }

    const result = await request(permission);
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
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

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
  inputBox: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  input: {
    fontSize: 16,
    paddingTop: 5,
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
    alignSelf: "center",
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
});
