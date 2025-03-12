import { View, Text, StyleSheet } from "react-native";
import React from "react";

const BankAccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heade}>
        <Text>BankAccount</Text>
      </View>
    </View>
  );
};

export default BankAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
