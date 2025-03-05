import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const RetailerScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getMobileNumber = async () => {
      const storedMobile = await AsyncStorage.getItem("userMobile");
      if (storedMobile) {
        setMobileNumber(storedMobile);
      }
    };
    getMobileNumber();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Section Title */}
      <Text style={styles.title}>Tell us your mobile number</Text>

      {/* Input Fields */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Mobile No</Text>
        <TextInput
          // style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          // style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (!mobileNumber || !name || !isChecked) {
            alert("Please fill all fields and agree to the terms.");
          } else {
            navigation.navigate("OtpScreen", { mobileNumber });
          }
        }}
      >
        <Text style={styles.loginText}>Login</Text>
        <Icon name="arrowright" size={22} color="white" style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

export default RetailerScreen;

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
