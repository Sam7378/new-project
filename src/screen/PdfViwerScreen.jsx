// import React, { useState } from "react";
// import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
// import Pdf from "react-native-pdf";

// const PdfViewerScreen = ({ route }) => {
//   const { pdf } = route.params;
//   const [loading, setLoading] = useState(true);
//   // const { pdfRequire } = route.params; // Extract pdfPath from route params

//   return (
//     <View style={styles.container}>
//       {/* Loader while PDF is loading */}
//       {loading && (
//         <ActivityIndicator size="large" color="#c9000a" style={styles.loader} />
//       )}

//       {/* PDF Viewer */}
//       <Pdf
//         source={pdf} // <-- Pass directly if it's a require()
//         onLoadComplete={(numberOfPages, filePath) => {
//           setLoading(false);
//           console.log(`PDF loaded with ${numberOfPages} pages.`);
//         }}
//         onError={(error) => {
//           console.error("PDF load error:", error);
//           setLoading(false);
//         }}
//         scale={1.0}
//         minScale={1.0}
//         maxScale={3.0}
//         spacing={10}
//         enablePaging={false}
//         style={styles.pdf}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   loader: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -25,
//     marginTop: -25,
//   },
// });

// export default PdfViewerScreen;
