import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../context/UserContext";

const PassbookScreen = ({ navigation }) => {
  const [viewType, setViewType] = useState("list");

  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const storeData = await AsyncStorage.getItem("userDetails");
  //       if (storeData) {
  //         const parseData = JSON.parse(storeData);
  //         setUserData(parseData);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user passbook:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const pointsData = [
    {
      id: 1,
      image: require("../assets/coin.png"),
      points: "0.00",
      titlePoint: "Earned Points",
    },
    {
      id: 2,
      image: require("../assets/coin.png"),
      points: "0.00",
      titlePoint: "Redeemed Points",
    },
    {
      id: 3,
      image: require("../assets/coin.png"),
      points: "0.00",
      titlePoint: "Balance Points",
    },
    {
      id: 4,
      image: require("../assets/coin.png"),
      points: 0,
      titlePoint: "Current Month Point",
    },
    {
      id: 5,
      image: require("../assets/coin.png"),
      points: 0,
      titlePoint: "Current Quarter Points",
    },
  ];

  const historyData = [
    {
      id: "1",
      title: "Points Earn History",
      subtitle: "list of points redeemed by you",
      image: require("../assets/coins.png"),
      screen: "Point",
    },
    {
      id: "2",
      title: "Gift Redeemed History",
      subtitle: "Points Earn History",
      image: require("../assets/star.png"),
      screen: "Gift",
    },
    {
      id: "3",
      title: "Cashback History",
      subtitle: "list of points redeemed by you",
      image: require("../assets/money-back.png"),
      screen: "Caseback",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Passbook</Text>
      </View>
      <View style={styles.userText}>
        <Text style={styles.userName}>{user?.firstName || "guest"}</Text>
      </View>

      <View style={styles.containerWrap}>
        {/* Earned Points Cards */}
        <View style={styles.cardContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerScroll}
          >
            {pointsData.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.points}>{item.points} </Text>
                <Text style={styles.earnText}>{item.titlePoint}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Toggle List/Grid */}
        <View style={styles.toggleWrap}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={() => setViewType("list")}>
              <Ionicons
                name="list"
                size={24}
                color={viewType === "list" ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType("grid")}>
              <Ionicons
                name="grid"
                size={24}
                color={viewType === "grid" ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>

          {/* Points Earn History */}
          <FlatList
            key={viewType} // Forces re-render when viewType changes
            data={historyData}
            keyExtractor={(item) => item.id}
            numColumns={viewType === "grid" ? 2 : 1} // Change column count dynamically
            renderItem={({ item }) =>
              viewType === "grid" ? (
                <View style={styles.cardGrid}>
                  <View>
                    <TouchableOpacity
                      style={styles.gridButton}
                      onPress={() => navigation.navigate(item.screen)}
                    >
                      <View style={styles.iconSquare}>
                        <Image source={item.image} style={styles.featureIcon} />
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.gridText}>
                      {item.title.split(" ").join("\n")}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.listCard}>
                  <TouchableOpacity
                    style={styles.historyCard}
                    onPress={() => navigation.navigate(item.screen)}
                  >
                    <View style={styles.square}>
                      <Image source={item.image} style={styles.featureIcon} />
                    </View>
                    <View style={styles.midTitle}>
                      <Text style={styles.historyTitle}>{item.title}</Text>
                      <Text style={styles.historySubtitle}>
                        {item.subtitle}
                      </Text>
                    </View>
                    <View style={styles.rightIcon}>
                      <Ionicons
                        name="chevron-forward-circle"
                        size={24}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c9000a", paddingVertical: 10 },
  containerWrap: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    height: "100%",
  },
  header: {
    flexDirection: "row",

    padding: 10,
  },

  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",

    marginLeft: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pointsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  gridButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  toggleWrap: {
    width: "85%",
    height: "45%",
    borderWidth: 1,
    borderColor: "red",
    marginLeft: 30,
    overflow: "hidden",
    marginTop: 80,
    borderRadius: 18,
  },

  containerScroll: {
    paddingVertical: 15,
  },
  cardContainer: {
    width: "100%",

    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    marginLeft: 10,
    width: 115,
    height: 120,
    backgroundColor: "#dcfce7",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  points: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f110e",
  },
  earnText: {
    fontSize: 14,
    color: "#141d14",
    fontWeight: "700",
    fontFamily: " sans-serif",
  },
  userText: {
    marginLeft: 40,
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 14,
    color: "gray",
  },
  toggleContainer: {
    flexDirection: "row",

    left: 240,
    gap: 10,
    marginVertical: 10,
    marginTop: 20,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#f9f9f9",

    flex: 1,
    justifyContent: "space-between",
  },
  historyTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  midTitle: {
    left: 18,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  historySubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: "gray",
    fontWeight: "600",
  },
  listCard: {
    color: "red",
  },
  cardGrid: {
    flex: 1,
    marginTop: 15,
    // backgroundColor: "red",
  },
  square: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: "#c9000a",
    margin: 5,
  },
  featureIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  // gridCard: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 15,
  //   backgroundColor: "#f9f9f9",
  //   borderRadius: 8,
  //   margin: 5,
  //   width: 120, // Adjust width
  //   height: 120, // Adjust height
  // },
  iconSquare: {
    width: 60,
    height: 60,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "red",
  },
  gridText: {
    // textAlign: "center",
    // fontSize: 14,
    // fontWeight: "bold",
    //
    // marginTop: 5,
    // width: 100,

    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    // width: "90%",

    backgroundColor: "#f9f9f9",
    margin: 5,
    borderRadius: 8,
    padding: 15,
  },
  rightIcon: {
    left: 20,
  },
});

export default PassbookScreen;
