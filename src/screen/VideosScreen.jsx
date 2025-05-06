import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import VideoCard from "../components/VideoCard";

const videoData = [
  {
    id: "1",
    title: "Bata",
    date: "21 mar 2025",
    url: "https://www.youtube.com/watch?v=ZZ84z86Emf0",
  },
  {
    id: "2",
    title: "Bata",
    date: "22 mar 2025",
    url: "https://www.youtube.com/watch?v=Na3_85gtfig",
  },
  {
    id: "3",
    title: "Bata",
    date: "23 mar 2025",
    url: "https://www.youtube.com/watch?v=4p5kbXjFnc8",
  },
  {
    id: "4",
    title: "Bata",
    date: "16 feb 2025",
    url: "https://www.youtube.com/watch?v=pM5Z2q7VVbM",
  },
  {
    id: "5",
    title: "Bata",
    date: "25 mar 2025",
    url: "https://www.youtube.com/watch?v=ZZ84z86Emf0",
  },
  {
    id: "6",
    title: "Bata",
    date: "26 mar 2025",
    url: "https://www.youtube.com/watch?v=4p5kbXjFnc8",
  },
];

const VideosScreen = () => {
  const navigation = useNavigation();
  // <TouchableOpacity style={styles.card} onPress={Linking.openURL(url)}>
  //   <AntDesign name="youtube" size={80} color="#fe0000" />
  //   <Text style={styles.title}>{title}</Text>
  // </TouchableOpacity>;
  // const videosHandle = () => {
  //   const url = "https://www.youtube.com/watch?v=ZZ84z86Emf0";
  //   Linking.openURL(url).catch((err) => {
  //     console.error("An error occurred", err);
  //   });
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="#fff"
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Videos</Text>
      </View>
      <View style={styles.wrap}>
        <FlatList
          data={videoData}
          keyExtractor={(item) => item.id}
          // contentOntainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <VideoCard title={item.title} url={item.url} date={item.date} />
          )}
        />
        {/* <TouchableOpacity style={styles.video} onPress={videosHandle}>
          <AntDesign name="youtube" size={80} color="#fe0000" />
          <View style={styles.videoDetails}>
            <Text style={styles.title}>
              Title : Bata {"\n"}Type : ads {"\n"}Date : 21 mar 2025
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ca000b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ca000b",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 10,
    color: "#fff",
  },
  backArrow: {
    right: 10,
  },
  wrap: {
    flex: 1,
    top: 20,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  // video: {
  //   alignItems: "center",
  //   marginTop: 25,
  //   // padding: ,
  //   backgroundColor: "#dddddd",
  //   width: "40%",
  //   height: "25%",
  //   alignSelf: "center",
  //   borderRadius: 3,
  //   // flexDirection: "row",
  //   justifyContent: "center",
  //   gap: 10,
  // },
  // videoDetails: {
  //   alignItems: "center",
  //   marginTop: 10,
  //   width: "100%",
  //   height: "50%",
  //   backgroundColor: "#000",

  //   alignSelf: "center",

  //   // flexDirection: "row",
  //   justifyContent: "center",
  //   gap: 10,
  // },
  // title: {
  //   fontSize: 15,
  //   color: "#fff",
  //   fontWeight: "400",
  // },
});
