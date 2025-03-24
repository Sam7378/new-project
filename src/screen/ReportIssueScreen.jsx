import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import Picker from "react-native-picker/picker";

const ReportIssueScreen = ({ navigation }) => {
  const [selectedIssue, setSelectedIssue] = useState("Point Related");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // Open Image Picker
  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Report Issue</Text>
      </View>

      {/* Issue Type Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedIssue}
          onValueChange={(itemValue) => setSelectedIssue(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Point Related" value="Point Related" />
          <Picker.Item label="KYC Related" value="KYC Related" />
          <Picker.Item
            label="Application Related"
            value="Application Related"
          />
        </Picker>
      </View>

      <View style={styles.divider} />

      {/* Short Description Input */}
      <TextInput
        style={styles.shortDesc}
        placeholder="Enter short description"
        value={shortDesc}
        onChangeText={setShortDesc}
      />

      {/* Long Description Input */}
      <View style={styles.card}>
        <TextInput
          style={styles.longDesc}
          placeholder="Enter detailed issue description"
          value={longDesc}
          onChangeText={setLongDesc}
          multiline
        />
      </View>

      {/* Upload Image Section */}
      <TouchableOpacity style={styles.uploadCard} onPress={openGallery}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        ) : (
          <>
            <Ionicons name="camera-outline" size={50} color="gray" />
            <Text style={styles.uploadText}>Upload the product image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Report Issue Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Report Issue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportIssueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  shortDesc: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  longDesc: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  uploadCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadText: {
    color: "gray",
    fontSize: 16,
    marginTop: 5,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
