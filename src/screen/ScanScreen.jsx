import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const ScanScreen = ({ navigation }) => {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [scannedData, setScannedData] = useState(null);
  const [scannerActive, setScannerActive] = useState(true);

  const handleScanSuccess = (e) => {
    const scanned = e.data;
    setScannedData(scanned);
    setScannerActive(false);

    Alert.alert(
      "Permission Required",
      "Do you want to proceed with this scanned data?",
      [
        {
          text: "Cancel",
          onPress: () => {
            setScannerActive(true);
            setScannedData(null);
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (
              scanned.startsWith("http://") ||
              scanned.startsWith("https://")
            ) {
              Linking.openURL(scanned).catch((err) =>
                console.error("Failed to open URL:", err)
              );
            } else {
              navigation.navigate("ScanResultScreen", { data: scanned });
            }

            setTimeout(() => {
              setScannerActive(true);
              setScannedData(null);
            }, 3000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Scanner */}
      <View style={styles.scannerContainer}>
        {scannerActive && (
          <QRCodeScanner
            onRead={handleScanSuccess}
            flashMode={flash}
            reactivate={false}
            showMarker={true}
            cameraStyle={styles.camera}
            customMarker={
              <View style={styles.customMarker}>
                <TouchableOpacity style={styles.helpButton}>
                  <Image
                    source={require("../assets/helpcircle.png")}
                    style={styles.helpImage}
                  />
                </TouchableOpacity>
              </View>
            }
            topContent={
              <View style={styles.headerOverlay}>
                <Text style={styles.headerText}>Scan Product Bar Code</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={styles.crossButton}>
                    <Ionicons name="close" size={32} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            }
          />
        )}

        {/* Flashlight toggle */}
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() =>
            setFlash(
              flash === RNCamera.Constants.FlashMode.torch
                ? RNCamera.Constants.FlashMode.off
                : RNCamera.Constants.FlashMode.torch
            )
          }
        >
          <MaterialCommunityIcons name="flashlight" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scanned result preview */}
      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Data: {scannedData}</Text>
        </View>
      )}

      {/* Bottom Instruction */}
      <View style={styles.bottomContainer}>
        <Image
          source={require("../assets/qrimg1.png")}
          style={styles.bottomImage}
          resizeMode="contain"
        />
        <Text style={styles.instructionText}>
          Please start scanning by pointing the{"\n"}camera towards Bar code
        </Text>
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    height: "100%",
  },
  customMarker: {
    borderColor: "#0A84FF",
    borderWidth: 3,
    width: 250,
    height: 220,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    top: 25,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.0)",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  crossButton: {
    backgroundColor: "#888",
    borderRadius: 20,
    bottom: 10,
    left: 35,
  },
  helpButton: {
    backgroundColor: "#888",
    width: 80,
    height: 42.9,
    borderRadius: 20,
    padding: 4,
    position: "absolute",
    bottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  helpImage: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  flashButton: {
    position: "absolute",
    top: "40%",
    right: 6,
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 30,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
  },
  bottomImage: {
    width: 200,
    height: 200,
    top: 20,
    marginBottom: 150,
  },
  instructionText: {
    textAlign: "center",
    fontSize: 20,
    color: "#444",
    lineHeight: 24,
    bottom: 130,
  },
  resultContainer: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    zIndex: 999,
  },
  resultText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
});
