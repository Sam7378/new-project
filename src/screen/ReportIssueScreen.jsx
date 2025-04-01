import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  FlatList,
} from "react-native";
import { Appbar, Card, Divider, Button } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Modal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ReportIssueScreen = ({ navigation, route }) => {
  const [selectedIssue, setSelectedIssue] = useState(
    route.params?.selectedIssue || null
  );
  const [shortDesc, setShortDesc] = useState(route.params?.shortDesc || "");
  const [longDesc, setLongDesc] = useState(route.params?.longDesc || "");
  const [image, setImage] = useState(route.params?.image || null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const issueTypes = [
    "KYC Related",
    "Point Related",
    "Application Related",
    "Product Related",
    "Qr Code Related",
    "Bar Code Related",
    "Others",
  ];

  // Open Image Picker
  const openGallery = () => {
    const options = { mediaType: "photo", quality: 0.8 };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Handle Dropdown Selection
  const handleIssueSelection = (issue) => {
    setSelectedIssue(issue);
    setDropdownVisible(false);
  };

  // Submit Report
  const handleSubmit = () => {
    if (!shortDesc || !selectedIssue) {
      Alert.alert("Error", "Please fill the field");
      return;
    }
    Alert.alert("Success", "Report submitted successfully!", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("Home", {
            selectedIssue,
            shortDesc,
            longDesc,
            image,
          }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Issue</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.dropdownText}>
            {selectedIssue || "Appointment Reasion *"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        {isDropdownVisible && (
          <FlatList
            data={issueTypes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelectedIssue(item);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropItem}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Dropdown Modal */}
        {/* <Modal
        isVisible={isDropdownVisible}
        onBackdropPress={() => setDropdownVisible(false)}
        style={styles.modal}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={issueTypes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleIssueSelection(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal> */}

        <Divider style={{ marginVertical: 15 }} />

        {/* Short Description */}
        <TextInput
          placeholder="Short Description *"
          value={shortDesc}
          placeholderTextColor={"#000"}
          onChangeText={setShortDesc}
          style={styles.input}
        />

        {/* Long Description */}
        <Card style={styles.card}>
          <TextInput
            placeholder="Long Description"
            multiline
            value={longDesc}
            onChangeText={setLongDesc}
            style={styles.longDesc}
            placeholderTextColor={"#000"}
          />
        </Card>

        {/* Image Upload */}
        <TouchableOpacity style={styles.uploadCard} onPress={openGallery}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <Image
                source={require("../assets/imageup.png")}
                style={styles.image}
              />
              {/* <Ionicons name="camera-outline" size={50} color="gray" /> */}
              <Text style={styles.uploadText}>Upload the product image</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Report Issue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportIssueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b71c1c",
  },
  header: {
    flexDirection: "row",

    padding: 30,

    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  wrap: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  dropdownButton: {
    padding: 15,
    // borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropItem: {
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
  item: {
    padding: 8,
    // backgroundColor: "#ddd",

    borderRadius: 5,
  },

  dropdownText: {
    fontSize: 16,
    color: "#000",
  },

  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,

    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  longDesc: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadCard: {
    backgroundColor: "#ebf2fb",
    width: "90%",

    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
  },
  uploadText: {
    color: "#000",
    fontSize: 16,
    marginTop: 5,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#b71c1c",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
});
