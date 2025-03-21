import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CustomAlert = ({ visible, message, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Move up to the center
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.closeIcon}>
            <AntDesign name="close" size={18} color="white" />
          </View>

          <Text style={styles.errorText}>Error</Text>
          <Text style={styles.messageText}>{message || "Bad request"}</Text>
          <TouchableOpacity style={styles.tryAgainButton} onPress={onClose}>
            <Text style={styles.tryAgainText}>Try Again</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 15,
    padding: 5,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
    textAlign: "center",
  },
  tryAgainButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  tryAgainText: {
    color: "white",
    fontWeight: "bold",
  },
  closeIcon: {
    alignItems: "center",
  },
});

export default CustomAlert;
