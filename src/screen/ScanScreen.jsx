import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

const ScanScreen = ({ navigation }) => {
  const handleScanSuccess = (e) => {
    Alert.alert("QR Code Scanned", e.data, [
      { text: "OK", onPress: () => navigation.navigate("Home") }, // Navigate after scan
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Scan QR Code</Text>
      <QRCodeScanner
        onRead={handleScanSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        reactivate={true} // Allow scanning multiple times
        showMarker={true} // Show scan frame
        markerStyle={styles.marker} // Custom styling
        cameraStyle={styles.camera} // Full-screen camera
      />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  camera: {
    width: "100%",
    height: "70%",
  },
  marker: {
    borderColor: "#00FF00", // Green scan frame
    borderRadius: 10,
  },
});
