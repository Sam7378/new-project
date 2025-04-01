import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    Alert.alert("Feedback Submitted", "Thank you for your feedback!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
    setRating(0);
    setComment("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Feedback</Text>
      </View>

      {/* Feedback Image */}
      <View style={styles.wrap}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/feedback1.png")}
            style={styles.image}
          />
        </View>

        {/* Star Rating */}
        <Text style={styles.rateText}>Please Rate</Text>
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleRating(index)}>
              <Icon
                name="star"
                size={38}
                color={index < rating ? "#ffd966" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Box */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentLabel}>Comment / Suggestions?</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Write your feedback here..."
              placeholderTextColor="#58585A"
              value={comment}
              onChangeText={setComment}
              multiline
            />
          </View>
        </View>

        {/* Submit Button */}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <View style={styles.buttonContent}>
            <Image
              source={require("../assets/buttonimg.png")}
              style={styles.buttonImg}
            />
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#c9000a" },
  header: { flexDirection: "row", gap: 10, alignItems: "center", padding: 20 },
  headerText: { fontSize: 20, fontWeight: "500", color: "#fff" },
  imageContainer: { alignItems: "center" },
  image: { width: 350, height: 270, resizeMode: "contain" },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  commentContainer: { marginBottom: 20 },
  commentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#58585A",
    marginBottom: 5,
    alignSelf: "center",
  },
  wrap: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    height: "85%",
    width: "100%",
  },
  rateText: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10,
    color: "#58585A",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    padding: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    fontWeight: "500",
  },

  submitButton: {
    backgroundColor: "#c9000a",
    padding: 15,
    width: "50%",
    alignSelf: "center",
    borderRadius: 3,
    alignItems: "center",
    marginTop: 25,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  buttonImg: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
});

export default FeedbackScreen;
