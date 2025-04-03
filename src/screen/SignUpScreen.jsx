import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: "",
    formId: "",
    ownerName: "",
    mobileNumber: "",
    otp: "",
    pincode: "",
    address: "",
    state: "",
    city: "",
    district: "",
    pan: "",
    aadhar: "",
    dob: new Date(),
    anniversary: new Date(),
  });
  const [otpVisible, setOtpVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    setOtpVisible(true);
    Alert.alert("OTP Sent", `Your OTP is: ${otp}`);
  };

  const handleOtpVerify = () => {
    if (form.otp === generatedOtp) {
      setIsOtpVerified(true);
      setOtpVisible(false);
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (
      !form.mobileNumber.trim() ||
      !form.firstName.trim() ||
      !form.aadhar.trim() ||
      !form.pincode.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim()
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(form));
      await AsyncStorage.setItem("userMobile", form.mobileNumber); // Store mobile number separately
      const storeData = await AsyncStorage.getItem("userDetails");
      console.log("stored Data", JSON.parse(storeData));
      Alert.alert(
        "Success",
        "Congratulations, your account has been successfully created",
        [{ text: "OK", onPress: () => navigation.navigate("Retailer") }]
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "red",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
          Registration
        </Text>
      </View>
      <Text style={styles.textTitle}>
        Please fill the following form to register
      </Text>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Mobile Number"
            style={[styles.input, { flex: 1 }]}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text) => handleChange("mobileNumber", text)}
          />
          {!isOtpVerified && (
            <TouchableOpacity style={styles.otpButton} onPress={generateOtp}>
              <Text style={{ color: "white" }}>Get OTP</Text>
            </TouchableOpacity>
          )}
          {isOtpVerified && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="blue"
              style={{ marginLeft: 10 }}
            />
          )}
        </View>
        {otpVisible && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Enter OTP"
              style={[styles.input, { flex: 1 }]}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) {
                  handleChange("otp", text);
                }
              }}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleOtpVerify}
            >
              <Text style={{ color: "white" }}>Verify</Text>
            </TouchableOpacity>
          </View>
        )}
        {[
          "firstName",
          "formId",
          "ownerName",
          "pincode",
          "address",
          "city",
          "district",
          "state",
          "pan",
        ].map((field) => (
          <TextInput
            key={field}
            placeholder={field}
            style={styles.input}
            onChangeText={(text) => handleChange(field, text)}
          />
        ))}

        <TextInput
          placeholder="Aadhar Number"
          style={styles.input}
          keyboardType="numeric"
          maxLength={12}
          onChangeText={(text) => handleChange("aadhar", text)}
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDobPicker(true)}
        >
          <Text>{form.dob.toDateString()}</Text>
        </TouchableOpacity>
        {showDobPicker && (
          <DateTimePicker
            value={form.dob}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDobPicker(false);
              if (date) handleChange("dob", date);
            }}
          />
        )}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowAnniversaryPicker(true)}
        >
          <Text>{form.anniversary.toDateString()}</Text>
        </TouchableOpacity>
        {showAnniversaryPicker && (
          <DateTimePicker
            value={form.anniversary}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowAnniversaryPicker(false);
              if (date) handleChange("anniversary", date);
            }}
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  textTitle: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  otpButton: {
    backgroundColor: "red",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  verifyButton: {
    backgroundColor: "green",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#c9202c",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
};

export default RegistrationScreen;
