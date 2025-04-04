import {
  Alert,
  DeviceEventEmitter,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-date-picker";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "react-native-image-picker";
import { UserContext } from "../context/UserContext";

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({});
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const navigation = useNavigation();
  const { updateUser } = useContext(UserContext); // Assuming you have a UserContext to manage user data

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userDetails");
        if (data) {
          const userData = JSON.parse(data);
          setFormData(userData);
          if (userData.profileImage) {
            setProfileImage({ uri: userData.profileImage });
          }
        }
      } catch (error) {
        console.log("Failed to load user data", error);
      }
    };
    loadUserData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", quality: 0.5 },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets[0].uri;
          setProfileImage({ uri });
          handleChange("profileImage", uri);
        }
      }
    );
  };

  const validateForm = () => {
    if (!formData.firstName || formData.firstName.trim() === "") {
      Alert.alert("Validation Error", "First Name is required.");
      return false;
    }
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      Alert.alert("Validation Error", "Enter a valid 10-digit Mobile Number.");
      return false;
    }
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      Alert.alert("Validation Error", "Enter a valid 6-digit Pincode.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await updateUser(formData); // updates both AsyncStorage & context
      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("Failed to save user data", error);
    }
  };

  // const handleSave = async () => {
  //   if (!validateForm()) return;

  //   try {
  //     await AsyncStorage.setItem("userDetails", JSON.stringify(formData));
  //     DeviceEventEmitter.emit("profileUpdated");
  //     Alert.alert("Success", "Profile updated successfully!", [
  //       { text: "OK", onPress: () => navigation.goBack() },
  //     ]);
  //   } catch (error) {
  //     console.log("Failed to save user data", error);
  //   }
  // };

  const renderInput = (label, name, keyboardType = "default") => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={formData[name] || ""}
        onChangeText={(text) => handleChange(name, text)}
        keyboardType={keyboardType}
        returnKeyType="next"
      />
    </View>
  );

  const renderGenderDropdown = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Gender</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowGenderDropdown(!showGenderDropdown)}
      >
        <Text>{formData.gender || "Select Gender"}</Text>
      </TouchableOpacity>
      {showGenderDropdown && (
        <View style={styles.dropdown}>
          {["Male", "Female", "Other"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                handleChange("gender", option);
                setShowGenderDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <TouchableOpacity style={styles.profileContainer} onPress={pickImage}>
        <Image
          source={profileImage || require("../assets/woman.png")}
          style={styles.profileImage}
        />
        <Text style={styles.changePhoto}>Change Profile Picture</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.form}>
        {renderInput("First Name", "firstName")}
        {renderInput("Mobile Number", "mobileNumber", "numeric")}
        {renderInput("Address", "address")}
        {renderInput("City", "city")}
        {renderInput("State", "state")}
        {renderInput("Pincode", "pincode", "numeric")}
        {renderInput("Aadhar Number", "aadhar", "numeric")}

        {renderGenderDropdown()}

        {/* DOB Picker */}
        <TouchableOpacity onPress={() => setShowDOBPicker(true)}>
          <Text style={styles.label}>DOB</Text>
          <Text style={styles.input}>
            {formData.dob ? new Date(formData.dob).toDateString() : "Select"}
          </Text>
        </TouchableOpacity>
        {showDOBPicker && (
          <DatePicker
            date={formData.dob ? new Date(formData.dob) : new Date()}
            mode="date"
            onDateChange={(date) => handleChange("dob", date.toISOString())}
            onCancel={() => setShowDOBPicker(false)}
            onConfirm={() => setShowDOBPicker(false)}
          />
        )}

        {/* Anniversary Picker */}
        <TouchableOpacity onPress={() => setShowAnniversaryPicker(true)}>
          <Text style={styles.label}>Anniversary</Text>
          <Text style={styles.input}>
            {formData.anniversary
              ? new Date(formData.anniversary).toDateString()
              : "Select"}
          </Text>
        </TouchableOpacity>
        {showAnniversaryPicker && (
          <DatePicker
            date={
              formData.anniversary ? new Date(formData.anniversary) : new Date()
            }
            mode="date"
            onDateChange={(date) =>
              handleChange("anniversary", date.toISOString())
            }
            onCancel={() => setShowAnniversaryPicker(false)}
            onConfirm={() => setShowAnniversaryPicker(false)}
          />
        )}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    backgroundColor: "#ca000b",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backArrow: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    top: 15,
    left: 50,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ca000b",
  },
  changePhoto: {
    color: "#ca000b",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "500",
  },
  form: {
    padding: 20,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#ca000b",
    padding: 15,
    alignItems: "center",
    margin: 20,
    borderRadius: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
