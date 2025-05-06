import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

const VideoCard = ({ title, url, date }) => {
  const handlePress = () => {
    Linking.openURL(url).catch((err) => {
      console.error("An error occurred", err);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.video} onPress={handlePress}>
        <AntDesign name="youtube" size={80} color="#fe0000" />
        <View style={styles.videoDetails}>
          <Text style={styles.title}>
            Title: {title} {"\n"}Type: Ad {"\n"}Date: {date}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 40,
    marginTop: 20,
    // alignItems: "center",
    marginLeft: 30,
  },
  video: {
    alignItems: "center",
    backgroundColor: "#dddddd",
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // alignSelf: "center",
  },
  videoDetails: {
    marginTop: 12,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,

    width: "100%",

    alignItems: "center",
  },
  title: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "400",
    textAlign: "center",
  },
});
