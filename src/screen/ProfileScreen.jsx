import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState("Guest");
  const [profileImage, setProfileImage] = useState(
    require("../assets/woman.png")
  );
  const [phone, setPhone] = useState("");

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
    fetchUserData(); // ✅ Fetch data once when component mounts

    const subscription = DeviceEventEmitter.addListener(
      "profileUpdated",
      (newImageUri) => {
        setProfileImage({ uri: newImageUri });
      }
    );

    return () => subscription.remove(); // ✅ Cleanup listener when unmounting
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="edit"
            size={24}
            color="black"
            style={styles.iconCircle}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.username}>Hello {userName}</Text>
        <TouchableOpacity>
          <MaterialIcons
            name="delete"
            size={24}
            color="black"
            style={styles.iconCircle}
          />
        </TouchableOpacity>
      </View>

      {/* Phone Section */}
      <View style={styles.phoneSection}>
        <Ionicons name="call" size={24} color="black" />
        <Text style={styles.phoneText}>{userData.phone}</Text>
      </View>

      {/* Scrollable User Data Section */}
      <ScrollView style={styles.detailsSection}>
        {Object.entries(userData).map(
          ([key, value]) =>
            key !== "profileImage" &&
            key !== "username" &&
            key !== "phone" && (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  {key.replace(/_/g, " ")}:
                </Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            )
        )}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          <Ionicons
            name="card"
            size={24}
            color="black"
            style={styles.iconCircle}
          />
          <Text style={styles.cardText}>Payment Method</Text>
          <TouchableOpacity>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "red" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold" },
  iconCircle: { padding: 10, backgroundColor: "#eee", borderRadius: 50 },
  phoneSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  phoneText: { marginLeft: 10, fontSize: 16 },
  detailsSection: { flex: 1 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  detailLabel: { fontWeight: "bold" },
  detailValue: { color: "#555" },
  bottomSection: { padding: 15 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
  addButton: { color: "blue", marginTop: 5, fontSize: 16 },
});

export default ProfileScreen;
