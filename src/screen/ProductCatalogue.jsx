import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProductCatalogue = () => {
  const navigation = useNavigation();

  const products = [
    {
      id: "1",
      title: "Sports Collection",
      image: require("../assets/pro1.png"),
      pdf: require("../assets/bata1.pdf"), // Corrected
    },
    {
      id: "2",
      title: "Ladies Collection",
      image: require("../assets/pro2.png"),
      pdf: require("../assets/bata2.pdf"), // Corrected
    },
    {
      id: "3",
      title: "School Collection",
      image: require("../assets/pro3.png"),
      pdf: require("../assets/bata3.pdf"), // Corrected
    },
    {
      id: "4",
      title: "Ladies Branding Collection",
      image: require("../assets/pro4.png"),
      pdf: require("../assets/bata4.pdf"), // Corrected
    },
  ];

  // Open the PDF in PdfViewer screen
  const openPdfScreen = (pdf) => {
    navigation.navigate("Pdfviewer", { pdfPath: pdf });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openPdfScreen(item.pdf)} // Corrected property name to `item.pdf`
    >
      <ImageBackground
        source={item.image}
        style={styles.backgroundImage}
        blurRadius={3}
        resizeMode="cover" // Ensure image is properly scaled
      >
        <View style={styles.overlay}>
          <Image source={item.image} style={styles.image} />
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Catalogue</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  headerText: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "90%", height: "100%", resizeMode: "contain" },
  textContainer: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  title: { fontSize: 17, fontWeight: "600", color: "#333" },
});

export default ProductCatalogue;
