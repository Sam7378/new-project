import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuItem from "../components/MenuItem";
import ShareModal from "../components/ShareModal";
import { DeviceEventEmitter } from "react-native";

const CustomDrawer = ({ onLogout }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Guest");
  const [profileImage, setProfileImage] = useState(
    require("../assets/woman.png")
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Function to fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      const storedImage = await AsyncStorage.getItem("profileImage");

      setUserName(storedName || "Guest");
      if (storedImage) {
        setProfileImage({ uri: storedImage });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // ✅ Fetch user data once

    const subscription = DeviceEventEmitter.addListener(
      "profileUpdated",
      (newImageUri) => {
        setProfileImage({ uri: newImageUri });
      }
    );

    return () => {
      subscription.remove(); // ✅ Cleanup event listener
    };
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     Alert.alert("success", "Logged out successfully!");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to logout. Please try again.");
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.username}>Hello {userName}</Text>
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
          icon="share"
          text="Product Catalogue"
          onPress={() => setModalVisible(true)}
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
          icon="ondemand-video"
          text="Videos"
          onPress={() => navigation.navigate("Videos")}
        />
        <MenuItem
          icon="gavel"
          text="Media"
          onPress={() => navigation.navigate("TermsAndConditions")}
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
              onPress: async () => {
                await handleLogout();
              },
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
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 30,
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
