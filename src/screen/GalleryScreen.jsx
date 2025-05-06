import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const images = [
  { id: 1, src: require("../assets/promo.png") },
  { id: 2, src: require("../assets/pro1.png") },
  { id: 3, src: require("../assets/pro2.png") },
  { id: 4, src: require("../assets/pro3.png") },
  { id: 5, src: require("../assets/pro4.png") },
  { id: 6, src: require("../assets/pro5.png") },
];

const GalleryScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const openImage = (imageSource) => {
    setSelectedImage(imageSource);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openImage(item.src)}
      style={styles.imageContainer}
    >
      <Image source={item.src} style={styles.image} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>Bank Account</Text> */}
        <Text style={styles.title}>Image Gallery</Text>
      </View>
      <View style={styles.wrap}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(Item) => Item.id}
          numColumns={3}
        />

        <Modal
          visible={selectedImage !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity style={styles.closeArea} onPress={closeModal} />
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Image
                  source={require("../assets/cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ca000b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    // paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    marginLeft: 12,
    color: "#ffffff",
  },
  wrap: {
    flex: 1,
    top: 20,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1 / 3,
    margin: 5,
  },
  image: {
    top: 20,
    width: width / 3.5 - 1,
    height: width / 2 - 10,
    // borderRadius: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  closeButton: {
    possition: "absolute",
    // top: 40,
    margin: 10,
    justifyContent: "center",
    // backgroundColor: "#ca000b",
    // padding: 20,
    // borderRadius: 20,
  },
  closeIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 55,
    tintColor: "#ca000b",
    backgroundColor: "#fff",
  },
});
