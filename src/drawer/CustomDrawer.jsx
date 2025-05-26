import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../components/MenuItem";
import ShareModal from "../components/ShareModal";
import { DeviceEventEmitter } from "react-native";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";

const CustomDrawer = ({ onLogout }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(
    require("../assets/woman.png")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(UserContext);
  // const user = useSelector((state) => state.user.formData);

  const firstName = user?.firstName || "Guest";
  const profileImg = user?.profileImage
    ? { uri: user.profileImage }
    : require("../assets/user.png");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userDetails");
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedData) {
          const parseData = JSON.parse(storedData);
          console.log("Stored user data:", parseData);
          setUserData(parseData);
        } else {
          setUserData("Guest");
        }

        if (storedImage) {
          setProfileImage({ uri: storedImage });
        } else {
          setProfileImage(require("../assets/account.png"));
        }
      } catch (error) {
        console.log("Error fetchin user data.", error);
      }
      setLoading(false);
    };
    fetchUserData();
    const subscription = DeviceEventEmitter.addListener(
      "profileUpdated",
      () => {
        fetchUserData();
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  // Function to fetch user data from AsyncStorage
  // const fetchUserData = async () => {
  //   try {
  //     const storedName = await AsyncStorage.getItem("userDetails");
  //     if (storedName) {
  //       setUserName(JSON.parse(storedName));
  //     }
  //     const storedImage = await AsyncStorage.getItem("profileImage");

  //     if (storedName) {
  //       setUserName(storedName); // ✅ Correctly set the name
  //     } else {
  //       setUserName("Guest"); // Default if no name found
  //     }
  //     if (storedImage) {
  //       setProfileImage({ uri: storedImage });
  //     }
  //   } catch (error) {
  //     console.log("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData(); // ✅ Fetch user data once

  //   const subscription = DeviceEventEmitter.addListener(
  //     "profileUpdated",
  //     (newImageUri) => {
  //       setProfileImage({ uri: newImageUri });
  //     }
  //   );

  //   return () => {
  //     subscription.remove(); // ✅ Cleanup event listener
  //   };
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.clear(); // Clears all stored user data
  //     Alert.alert("Success", "Logged out successfully!");
  //     onLogout?.(); // Optional callback
  //     navigation.replace("Login"); // Navigate to Login screen or initial screen
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to logout. Please try again.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profileImg} style={styles.profileImage} />

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.username}>Hello {firstName}</Text>

          {/* Retailer Account Text */}
          <Text style={styles.retailer}>Retailer Account</Text>

          {/* KYC Section (Now properly aligned below Retailer Account) */}
          <View style={styles.kyc}>
            <Image
              source={require("../assets/cancel.png")}
              style={styles.image}
            />
            <Text style={styles.kycText}>KYC Status</Text>
          </View>
          <View style={styles.version}>
            <Text style={styles.versionText}>Version : 9.0.4</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem
          icon="home"
          text="Home"
          onPress={() => navigation.navigate("Home")}
        />
        <MenuItem
          icon="person"
          text="Profile"
          onPress={() => navigation.navigate("Profile")}
          iconSet="Octicons"
        />
        <MenuItem
          icon="card-giftcard"
          text="Gift Catalogue"
          onPress={() => navigation.navigate("Reward")}
        />
        <MenuItem
          icon="photo-library"
          text="Gallery"
          onPress={() => navigation.navigate("Gallery")}
        />
        <MenuItem
          icon="view-compact"
          text="Product Catalogue"
          onPress={() => navigation.navigate("ProductCatalogue")}
        />
        <MenuItem
          icon="support-agent"
          text="Help and Support"
          onPress={() => navigation.navigate("Help")}
        />
        <MenuItem
          icon="feedback"
          text="Feedback"
          onPress={() => navigation.navigate("Feedback")}
        />
        {/* <MenuItem
          icon="menu-book"
          text="User Manual"
          onPress={() => navigation.navigate("UserManual")}
        /> */}
        <MenuItem
          icon="smart-display"
          text="Videos"
          onPress={() => navigation.navigate("Videos")}
        />
        <MenuItem
          icon="sensor-window"
          text="Media"
          onPress={() => navigation.navigate("Media")}
        />
        {/* <MenuItem
          icon="error-outline"
          text="Report an Issue"
          onPress={() => navigation.navigate("ReportIssue")}
        /> */}
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Logout",
              style: "destructive",
              onPress: onLogout, // ✅ comma instead of semicolon
            },
          ])
        }
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>LOG OUT</Text>
          <Icon name="logout" size={20} color="white" />
        </View>
        <Text style={styles.designText}>
          Designed and developed by Genified
        </Text>
      </TouchableOpacity>

      <ShareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    backgroundColor: "#ca000b",
    padding: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#ffffff",
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    // marginBottom: 30,
    fontFamily: "sans-serif",
  },
  retailer: {
    fontSize: 14,
    alignItems: "center",
    // right: 85,
    marginBottom: 10,
    // top: 10,
    left: 15,
    color: "#fff",
    fontWeight: "400",
    fontFamily: "sans-serif",
  },
  kyc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "70%",
    // marginTop: 8,
    left: 15,
    padding: 4,
  },
  kycText: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: "700",
    color: "#000",
    fontFamily: "sans-serif",
  },
  image: {
    height: 10,
    width: 10,
    resizeMode: "contain",
  },
  version: {
    top: 25,
    left: 70,
  },
  versionText: {
    fontSize: 12.5,
    color: "#fff",
    // marginTop: 10,
    fontWeight: "200",
    fontFamily: "sans-serif",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonContainer: { flexDirection: "row", marginTop: "auto" },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#1C45AB",
  },
  logoutButton: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "#ca000b",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    marginRight: 10,
  },
  designText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
    textAlign: "center",
  },
});

export default CustomDrawer;
