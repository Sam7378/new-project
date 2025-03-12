import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

const featureData = [
  {
    name: "Bank Account",
    image: require("../assets/bank.png"),
    screen: "BankAccount",
  },
  {
    name: "Passbook",
    image: require("../assets/passbook1.png"),
    screen: "Passbook",
  },
  {
    name: "Product Catalogue",
    image: require("../assets/book.png"),
    screen: "ProductCatalogue",
  },
  {
    name: "Report an Issue",
    image: require("../assets/report.png"),
    screen: "ReportAnIssue",
  },
  {
    name: "Customer Support",
    image: require("../assets/support.png"),
    screen: "Help",
  },
  { name: "Reward", image: require("../assets/medal.png"), screen: "Reward" },
];

const FeatureGrid = ({ navigation }) => {
  return (
    <View style={styles.featureCard}>
      <FlatList
        data={featureData}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featureItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconCircle}>
              <Image source={item.image} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 8,
  },
  featureItem: { flex: 1, alignItems: "center", marginVertical: 10 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fbf0ef",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  featureIcon: { width: 37, height: 37, resizeMode: "contain" },
  featureText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});

export default FeatureGrid;
