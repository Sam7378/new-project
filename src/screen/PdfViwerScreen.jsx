import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Pdf from "react-native-pdf";

const PdfViewerScreen = ({ route }) => {
  const { pdfPath } = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="red" style={styles.loader} />
      )}
      <Pdf
        source={pdfPath} // ✅ Corrected
        onLoadComplete={() => setLoading(false)} // ✅ Show loader while loading
        onError={(error) => console.log(error)}
        scale={1.0}
        minScale={1.0}
        maxScale={3.0}
        spacing={10}
        enablePaging={true}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default PdfViewerScreen;
