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
  Dimensions,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

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
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>{campaignData?.title || "Campaign"}</Text>

          {/* Image */}
          {campaignData?.image && (
            <Image
              source={require("../assets/promo.png")}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          {/* Video Button */}
          {campaignData?.videoUrl && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => Linking.openURL(campaignData.videoUrl)}
            >
              <Text style={styles.videoButtonText}>VIDEO</Text>
            </TouchableOpacity>
          )}

          {/* Know More Button */}
          <TouchableOpacity
            style={styles.knowMoreButton}
            onPress={() => {
              // onClose();
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
    width: width * 0.9,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0.00005,

    backgroundColor: "#ca000b",
    borderRadius: 20,
    padding: 5,
    zIndex: 10,
  },
  title: {
    right: 10,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
    textAlign: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 20,
    borderRadius: 8,
  },
  videoButton: {
    backgroundColor: "#f60067",
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  videoButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  knowMoreButton: {
    backgroundColor: "#2c2c2c",
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  knowMoreText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
