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
import { UserContext } from "../context/UserContext";

const RetailerLoginScreen = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [storedUser, setStoredUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const { user } = useContext(UserContext); // Assuming you have a UserContext to manage user state

  console.log("Stored User:", storedUser);
  useEffect(() => {
    const clearOldTocken = async () => {
      await AsyncStorage.removeItem("userToken");
    };
    clearOldTocken();
  }, []);

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

  const validateMobile = () => {
    if (!username.trim() || !mobileNumber.trim()) {
      Alert.alert("Error", "Please enter mobile number and name.");
      return false;
    }

    if (!/^\d{10}$/.test(mobileNumber.trim())) {
      Alert.alert("Error", "Enter a valid 10-digit mobile number.");
      return false;
    }

    if (!isChecked) {
      Alert.alert("Error", "Please agree to the terms and conditions.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateMobile()) return; // Validate mobile number and username
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
      Alert.alert("Term & Conditions", "Please agree to the terms.");
      return;
    }

    try {
      let matchedUser = null;
      if (
        user?.mobileNumber === trimmedMobile &&
        user?.firstName === trimmedUsername
      ) {
        matchedUser = user;
      } else if (
        storedUser?.mobileNumber === trimmedMobile &&
        storedUser?.firstName === trimmedUsername
      ) {
        matchedUser = storedUser;
      }

      if (matchedUser) {
        // Generate or retrieve the token (for example, from the matchedUser)
        const userToken = "some_unique_token_here"; // Replace with your actual token retrieval logic

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("userToken", userToken);
        console.log("Token stored:", userToken);

        navigation.navigate("OtpScreen", { mobileNumber: trimmedMobile });

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
      navigation.replace("MainApp");
      return;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      navigation.replace("MainApp");
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
          onPress={() => navigation.navigate("Signup")}
          style={styles.registerButton}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Tell us your mobile number</Text>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Mobile No</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChangeText={(text) => {
            setMobileNumber(text);
            if (text.length === 10) {
              const stored = storedUser || user;
              if (stored?.mobileNumber === text) {
                setUsername(stored.firstName);
              }
            }
          }}
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="#999"
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
        <Icon name="arrowright" size={22} color="white" style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

export default RetailerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerImage: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  registerText: {
    fontSize: 18,
    color: "#F7F9FA",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#2C2C2C",
    height: 50,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#171717",
    marginBottom: 45,
    marginTop: 45,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 18,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 18,
    color: "#555",
  },
  input: {
    color: "black",
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#c9202c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",

    marginRight: "35%",
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "35%",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 20,
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
    fontSize: 18,
    color: "gray",
  },
  arrow: {
    marginLeft: 15,
  },
});
