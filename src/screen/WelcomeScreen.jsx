import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Supplybeam",
    description: "Warehouse / Distribution Track N Trace with FIFO",
    image: require("../assets/wel1.png"),
  },
  {
    id: "2",
    title: "Rewardify",
    description: "Retailer & Consumer Loyalty Program",
    image: require("../assets/wel2.png"),
  },
  {
    id: "3",
    title: "DWAM",
    description: "Activate Digital Warranty at Your Fingertips.",
    image: require("../assets/wel3.png"),
  },
  {
    id: "4",
    title: "GenuineMark",
    description: "Lorem Ipsum is simply dummy text of the printing",
    image: require("../assets/wel4.png"),
  },
  {
    id: "5",
    title: "Scan & Win",
    description: "Scan the QR Code and Win Suprising Gifts",
    image: require("../assets/wel5.png"),
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("firstTimeUser", "completed");
      navigation.replace("ProfileSelection"); // ✅ Replacing navigation
    } catch (error) {
      console.error("Error saving firstTimeUser:", error);
    }
  };

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("firstTimeUser", "completed");
      navigation.replace("ProfileSelection"); // ✅ Replacing navigation
    } catch (error) {
      console.error("Error finishing onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const pageIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentPage(pageIndex);
        }}
        renderItem={({ item }) => {
          const id = parseInt(item.id, 10);
          // Define individual styles for each image
          const imageStyles = {
            1: styles.image1,

            2: styles.image2,

            3: styles.image3,

            4: styles.image4,

            5: styles.image5,
          };
          const titleStyles = {
            1: styles.title1,
            2: styles.title2,
            3: styles.title3,
            4: styles.title4,
            5: styles.title5,
          };

          const descriptionStyles = {
            1: styles.description1,
            2: styles.description2,
            3: styles.description3,
            4: styles.description4,
            5: styles.description5,
          };

          return (
            <View style={styles.page}>
              <Image
                source={item.image}
                style={[styles.image, imageStyles[item.id]]}
              />
              <Text style={titleStyles[id]}>{item.title}</Text>
              <Text style={descriptionStyles[id]}>{item.description}</Text>
            </View>
          );
        }}
        extraData={currentPage}
      />

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentPage === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.buttonText}>Skip</Text>
        </Pressable>
        <Pressable onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.buttonText}>
            {currentPage === onboardingData.length - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    opacity: 1,
  },
  page: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  // image: {
  //   marginBottom: 20,
  // },
  image1: {
    width: 340.7,
    height: 229.03,
    opacity: 1,
  },
  image2: {
    width: 345.86,
    height: 196.46,
    opacity: 1,
  },
  image3: {
    width: 227,
    height: 223,
    opacity: 1,
  },
  image4: {
    width: 290,
    height: 211,
    opacity: 1,
  },
  image5: {
    width: 289,
    height: 263,
    opacity: 1,
  },
  title1: {
    fontSize: 27,
    fontWeight: "600",
    color: "#424141",
    textAlign: "center",
    marginTop: 20,
    width: 176,
    height: 37,
  },
  title2: {
    fontSize: 27,
    fontWeight: "600",
    color: "#424141",
    textAlign: "center",
    marginTop: 20,
    width: 138,
    height: 37,
    fontFamily: "Poppins",
    opacity: 1,
  },
  title3: {
    fontSize: 27,
    fontWeight: "700",
    color: "#424141",
    textAlign: "center",
    marginTop: 20,
    width: 90,
    height: 37,
    opacity: 1,
    fontFamily: "Poppins",
  },
  title4: {
    fontSize: 27,
    fontWeight: "700",
    color: "#424141",
    textAlign: "center",
    marginTop: 20,
    width: 184,
    height: 37,
    opacity: 1,
    fontFamily: "Poppins",
  },
  title5: {
    fontSize: 28,
    fontWeight: "700",
    color: "#424141",
    textAlign: "center",
    marginTop: 20,
    width: 296,
    height: 51,
    fontFamily: "Poppins",
    opacity: 1,
  },

  // **Unique Description Styles**
  description1: {
    fontSize: 18,
    color: "#424141",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "600",
    width: 296,
    height: 51,
  },
  description2: {
    fontSize: 18,
    color: "#424141",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "500",
    height: 51,
    width: 296,
    opacity: 1,
  },
  description3: {
    fontSize: 18,
    color: "#424141",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "500",
    width: 296,
    height: 51,
    opacity: 1,
  },
  description4: {
    fontSize: 18,
    color: "#424141",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "600",
    width: 296,
    height: 51,
    opacity: 1,
  },
  description5: {
    fontSize: 18,
    color: "#424141",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "500",
    width: 296,
    height: 51,
  },

  indicatorContainer: {
    flexDirection: "row",
    marginBottom: 120,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5,
    border: 1,
    borderColor: "#DDDDDD",
  },
  activeIndicator: {
    backgroundColor: "#0087A2",
    width: 12,
    height: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "absolute",
    bottom: 50,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F2F2F2",
    marginRight: 20,
    borderRadius: 5,
    opacity: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "#0087A2",
    fontWeight: "700",
    textAlign: "center",
    opacity: 1,
    fontFamily: "Poppins",

    height: 25,
  },
});

export default WelcomeScreen;
