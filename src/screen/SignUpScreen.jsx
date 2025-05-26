import React, { useContext, useState } from "react";
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
// import { UserContext } from "../context/UserContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../context/UserContext";
// import { useDispatch, useSelector } from "react-redux";
// import { saveFormData } from "../redux/userSlice";

const userinfo = [
  {
    key: "pincode",
    label: "Pincode",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "district",
    label: "District",
  },
  {
    key: "state",
    label: "State",
  },
  {
    key: "pan",
    label: "Pan",
  },
];

const DateInput = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.inputDate} onPress={onPress}>
    <Text style={styles.labelText}>{value ? value.toDateString() : label}</Text>
    <MaterialCommunityIcons
      name="calendar-month-outline"
      size={20}
      color="#666"
    />
  </TouchableOpacity>
);

const RegistrationScreen = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

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
    // asm: "",
    // fsr: "",
  });
  const [otpVisible, setOtpVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [dob, setDob] = useState(false);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);
  const [anniversary, setAnniversary] = useState(false);
  const { updateUser } = useContext(UserContext);

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

    // dispatch(saveFormData(form));
    // Alert.alert(
    //   "Success",
    //   "Congratulations, your account has been successfully created",
    //   [{ text: "OK", onPress: () => navigation.navigate("Retailer") }]
    // );

    const userData = {
      ...form,
      dob: dob ? dob.toDateString() : null,
      anniversary: anniversary ? anniversary.toDateString() : null,
    };

    try {
      // await AsyncStorage.setItem("userDetails", JSON.stringify(form));
      await AsyncStorage.setItem("userDetails", JSON.stringify(userData));
      await AsyncStorage.setItem("userMobile", form.mobileNumber); // Store mobile number separately
      // dispatch(setUser(userData));
      const storeData = await AsyncStorage.getItem("userDetails");
      await updateUser(form);
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
          backgroundColor: "#ca000b",
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
      <View style={{ padding: 10 }}>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Outlet Name</Text>
          <TextInput
            placeholder="firm_Name"
            style={styles.input}
            placeholderTextColor="#333"
            onChangeText={(text) => handleChange("firstName", text)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Outlet_id</Text>
          <TextInput
            placeholder="firm_id"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#333"
            onChangeText={(text) => handleChange("formId", text)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Owner Name</Text>
          <TextInput
            placeholder="name"
            style={styles.input}
            placeholderTextColor="#333"
            onChangeText={(text) => handleChange("ownerName", text)}
          />
        </View>
        <View style={styles.mobileBox}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="mobile no"
              style={[styles.input, { flex: 1 }]}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleChange("mobileNumber", text)}
              placeholderTextColor="#333"
            />
          </View>
          {!isOtpVerified && (
            <TouchableOpacity style={styles.otpButton} onPress={generateOtp}>
              <Text
                style={{
                  color: "white",
                }}
              >
                get {"\n"}otp
              </Text>
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
          <View style={styles.mobileBox}>
            <Text style={styles.label}>Enter OTP</Text>
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
          </View>
        )}
        {userinfo.map(({ key, label }) => (
          <View style={styles.inputBox} key={key}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              // key={field}
              placeholder={label}
              style={styles.input}
              placeholderTextColor="#333"
              onChangeText={(text) => handleChange(key, text)}
            />
          </View>
        ))}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Aadhar</Text>
          <TextInput
            placeholder="aadhar"
            style={styles.input}
            keyboardType="numeric"
            maxLength={12}
            onChangeText={(text) => handleChange("aadhar", text)}
            placeholderTextColor="#333"
          />
        </View>
        <View style={styles.dateContainer}>
          <DateInput
            label="Anniversary Date"
            value={anniversary}
            onPress={() => setShowAnniversaryPicker(true)}
          />
          {showAnniversaryPicker && (
            <DateTimePicker
              value={anniversary || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowAnniversaryPicker(false);
                if (date) setAnniversary(date);
              }}
            />
          )}

          <DateInput
            label="D.O.B"
            value={dob}
            onPress={() => setShowDobPicker(true)}
          />
          {showDobPicker && (
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDobPicker(false);
                if (date) setDob(date);
              }}
            />
          )}
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>ASM</Text>
          <TextInput
            placeholder="asm *"
            style={styles.input}
            placeholderTextColor="#333"
            onChangeText={(text) => handleChange("asm", text)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>FSR</Text>
          <TextInput
            placeholder="fsr *"
            style={styles.input}
            placeholderTextColor="#333"
            onChangeText={(text) => handleChange("frs", text)}
          />
        </View>
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
    color: "#333",
  },
  inputBox: {
    borderWidth: 0.5,
    borderColor: "gray",
    // borderRadius: 5,
    // padding: ,
    marginLeft: 10,
    marginBottom: 20,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: 16,
    color: "gray",
  },
  input: {
    fontSize: 15,
    // borderWidth: 1,
    // borderColor: "#ccc",

    // marginVertical: 5,
    // borderRadius: 5,
    // backgroundColor: "#f9f9f9",
    left: 10,
    color: "#000",
  },
  mobileBox: {
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    marginBottom: 20,
    width: "75%",
  },
  otpButton: {
    backgroundColor: "#c9202c",
    padding: 10,
    marginLeft: 35,
    borderRadius: 3,
    width: 45,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButton: {
    backgroundColor: "green",
    padding: 20,
    marginLeft: 25,
    borderRadius: 5,
  },
  dateContainer: {
    padding: 16,
  },
  inputDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 14,
    borderRadius: 3,
    marginBottom: 10,
  },
  labelText: {
    color: "#000",
    fontSize: 16,
  },
  // dateText: {
  //   color: "#333",
  // },
  submitButton: {
    backgroundColor: "#c9202c",
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
};

export default RegistrationScreen;
