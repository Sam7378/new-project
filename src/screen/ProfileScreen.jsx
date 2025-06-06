import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(
    require("../assets/user.png")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const storedData = await AsyncStorage.getItem("userDetails");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            if (parsedData.profileImage) {
              setProfileImage({ uri: parsedData.profileImage });
            }
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const storedData = await AsyncStorage.getItem("userDetails");
  //       if (storedData) {
  //         setUserData(JSON.parse(storedData));
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user data:", error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchUserData();
  // }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View style={styles.container}>
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.modalTouchArea}
          >
            <View style={styles.popupContainer}>
              <Image
                source={profileImage}
                style={styles.enlargedImage}
                resizeMethod="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backWrrow}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.profileImageContainer}
        >
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.username}>
            Hello {userData?.firstName || "Samrat"}
          </Text>
          <Text style={styles.retailer}>
            {userData?.profileSelected || "Retailer Account"}
          </Text>
        </View>

        {/* Edit & Delete Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate("Editprofile")}
          >
            <Entypo name="edit" size={24} color="#ca000b" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => {
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancelled"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      try {
                        await AsyncStorage.clear();
                        BackHandler.addEventListener(
                          "hardwareBackPress",
                          () => true
                        );
                        Alert.alert(
                          "Account Deleted",
                          "Your account has been deleted successfully."
                        );

                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Retailer" }],
                          })
                        );
                      } catch (error) {
                        Alert.alert(
                          "Error",
                          "Failed to delete account. Please try again later."
                        );
                      }
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <AntDesign name="delete" size={24} color="#ca000b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mobile Number Section */}
      <View style={styles.mobileNumber}>
        <Feather name="phone-call" size={24} color="#515151" />
        <Text style={styles.mobText}>{userData?.mobileNumber}</Text>
      </View>

      {/* Scrollable Section: User Details & Cards */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Information */}
        {userData ? (
          <View style={styles.infoContainer}>
            <ProfileField label="First Name" value={userData.firstName} />
            <ProfileField label="Mobile Number" value={userData.mobileNumber} />
            <ProfileField label="formId" value={userData.formId} />
            <ProfileField label="ownerName" value={userData.ownerName} />
            <ProfileField label="Address" value={userData.address} />
            <ProfileField label="City" value={userData.city} />
            <ProfileField label="State" value={userData.state} />
            <ProfileField label="Pincode" value={userData.pincode} />
            <ProfileField label="pan" value={userData.pan} />
            <ProfileField label="aadhaar" value={userData.aadhar} />

            <ProfileField
              label="DOB"
              value={
                userData.dob ? new Date(userData.dob).toDateString() : "N/A"
              }
            />
            <ProfileField
              label="Anniversary"
              value={
                userData.anniversary
                  ? new Date(userData.anniversary).toDateString()
                  : "N/A"
              }
            />
          </View>
        ) : (
          <Text style={styles.noData}>No user data found</Text>
        )}

        {/* Bottom Card Section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardImageCircle}>
              <Image
                source={require("../assets/money.png")}
                style={styles.cardImage}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>Payment {"\n"} Methods</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Bank")}
                style={styles.button}
              >
                <Text style={styles.cardSubTitle}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardImageCircle}>
              <Image
                source={require("../assets/checkbook.png")}
                style={styles.cardImage}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>Check {"\n"} Passbook</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Passbook")}
                style={styles.button}
              >
                <Text style={styles.cardSubTitle}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileField = ({ label, value }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.divider} />
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#ca000b",
    padding: 50,
    alignItems: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backWrrow: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },
  profileImageContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#ffffff",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalTouchArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "#fff",
    padding: 0.4,
    borderRadius: 10,
  },
  enlargedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  modalContent: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  retailer: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "400",
    fontFamily: "sans-serif",
  },
  iconContainer: {
    // flexDirection: "row",
    gap: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  mobileNumber: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#cccc",
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  mobText: {
    fontSize: 16,
    left: 10,
    color: "#515151",
    fontWeight: "500",
  },
  scrollContainer: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 25,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
    left: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    left: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 8,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    padding: 5,
    backgroundColor: "#ca000b",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  card: {
    width: "42%",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // elevation: 3,
    borderWidth: 1,
    borderColor: "#ca000b",
    // overflow: "hidden",
  },
  cardImageCircle: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
    borderWidth: 0.4,
  },
  // cardTitleImage: {
  //   backgroundColor: "#ca000b",
  //   borderRadius: 4,
  //   padding: 3,
  //   left: 15,
  //   top: 3,
  // },
  cardImage: {
    width: 30,
    height: 30,
    // marginRight: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#515151",
    left: 10,
    fontFamily: "sans-serif",
  },
  cardSubTitle: {
    fontSize: 11,
    color: "#fff",

    alignSelf: "center",
  },
});
