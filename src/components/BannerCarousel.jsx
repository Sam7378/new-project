import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const BannerCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const bannerData = [
    require("../assets/banner1.jpg"),
    require("../assets/banner2.jpg"),
    require("../assets/banner3.jpg"),
  ];

  return (
    <View style={styles.bannerCard}>
      <Carousel
        data={bannerData}
        renderItem={({ item }) => (
          <Image source={item} style={styles.bannerImage} />
        )}
        sliderWidth={width}
        itemWidth={width * 0.9}
        onSnapToItem={setActiveSlide}
      />
      <View style={styles.radioButtonContainer}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.radioButton,
              { backgroundColor: activeSlide === index ? "#ca000b" : "gray" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerCard: {
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  bannerImage: { width: width * 0.9, height: 150, borderRadius: 8 },
  radioButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    flexDirection: "row",
    transform: [{ translateX: -30 }],
  },
  radioButton: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 5 },
});

export default BannerCarousel;
