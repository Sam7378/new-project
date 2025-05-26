import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import BannerCarousel from "../components/BannerCarousel";
import BalanceSection from "../components/BalanceSection";
import FeatureGrid from "../components/FeatureGrid";
import DipsComponent from "../components/DipsComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import CampaignModal from "../components/CampaignModal";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "react-native-fs";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  // const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  // const user = useSelector((state) => state.user.formData);
  const capaignData = {
    title: "Campaign App Promotion",
    image: require("../assets/banner1.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=ZZ84z86Emf0",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  // console.log("user", user);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const storeData = await AsyncStorage.getItem("userDetails");
  //       console.log("fetched home", storeData);
  //       if (storeData) {
  //         const parseData = JSON.parse(storeData);
  //         setUserData(parseData);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header navigation={navigation} />
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome {user?.firstName || "Guest"}
          </Text>
          {/* <Text style={styles.welcomeText}>
            Welcome {user?.firstName || "Guest"}
          </Text> */}
          <MaterialIcons
            name="military-tech"
            size={24}
            color="gold"
            style={styles.medalIcon}
          />
        </View>
        <BannerCarousel />
        <BalanceSection />
        <FeatureGrid navigation={navigation} />
        <DipsComponent navigation={navigation} />
      </ScrollView>
      <CampaignModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        campaignData={capaignData}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ca000b",
    marginLeft: 10,
  },
  medalIcon: { marginLeft: 5 },
});
