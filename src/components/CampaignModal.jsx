import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const CampaignModal = ({ visible, onClose, campaignData }) => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={25} color="white" />
          </TouchableOpacity>

          {/* Dynamic Title */}
          <Text style={styles.title}>{campaignData?.title || "Campaign"}</Text>

          {/* Dynamic Image */}
          {campaignData?.image && (
            <Image
              source={require("../assets/banner1.jpg")}
              style={styles.image}
            />
          )}

          {/* Video Button (Opens Dynamic Video URL) */}
          {campaignData?.videoUrl && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => Linking.openURL(campaignData.videoUrl)}
            >
              <Text style={styles.videoButtonText}> VIDEO</Text>
            </TouchableOpacity>
          )}

          {/* Know More Button */}
          <TouchableOpacity
            style={styles.knowMoreButton}
            onPress={() => {
              onClose(); // Close modal first
              navigation.navigate("CampaignDetails", {
                campaign: campaignData,
              });
            }}
          >
            <Text style={styles.knowMoreText}>KNOW MORE</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CampaignModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    left: 325,
    bottom: 420,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 8,
  },
  videoButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
  },
  videoButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  knowMoreButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    width: 300,
    alignItems: "center",
  },
  knowMoreText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
