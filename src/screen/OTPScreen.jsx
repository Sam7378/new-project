import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  BackHandler,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber || "XXXXXXXXXX";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    generateOtp();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsResendActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    Alert.alert("OTP Sent", `Your OTP is: ${newOtp}`);
    setCountdown(60);
    setIsResendActive(false);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Optional: Confirm exit
        Alert.alert("Exit App", "Do you want to exit the app?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // prevent default back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      // ToastAndroid.show(
      //   "Success",
      //   "OTP Verified Successfully!",
      //   ToastAndroid.SHORT
      // );
      Alert.alert("Success", "OTP Verified Successfully!", [
        {
          text: "OK",
          onPress: () => {
            requestLocationPermission();
          },
        },
      ]);
      navigation.navigate("MainApp");
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  const handleChangeText = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);
    if (status === RESULTS.GRANTED) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
      return;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
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
      <View style={styles.iconContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.otpVerification}>OTP Verification</Text>
      </View>

      <Text style={styles.otpText}>Enter the OTP sent to {mobileNumber}</Text>
      <Image source={require("../assets/otp.jpeg")} style={styles.image} />

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") handleBackspace(index);
            }}
          />
        ))}
      </View>

      <Text style={styles.count}>{countdown}s</Text>

      <Text style={styles.receiveText}>Did not receive any code?</Text>

      <TouchableOpacity
        style={[
          styles.resendButton,
          // { backgroundColor: isResendActive ? "red" : "gray" },
        ]}
        onPress={generateOtp}
        disabled={!isResendActive}
      >
        <Text
          style={[
            styles.resendText,
            { color: isResendActive ? "red" : "#2C2C2C" },
          ]}
        >
          Resend Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleVerifyOtp}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    padding: 15,
  },
  otpVerification: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  image: {
    alignSelf: "center",
    marginVertical: 30,
    width: 140,
    height: 140,
  },
  otpText: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10,
    marginTop: 20,
    color: "#2C2C2C",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  count: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  receiveText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
    color: "#2C2C2C",
  },
  resendButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#c9202c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    marginRight: 100,
    marginLeft: 100,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
});
