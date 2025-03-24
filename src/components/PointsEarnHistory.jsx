import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const PointEarnHistory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingStart, setSelectingStart] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Regular Points");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Point History</Text>
      </View>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <View style={styles.pointRow}>
          <View>
            <Text style={styles.subtitle}>You Have</Text>
            <Text style={styles.pointsValue}>0.00</Text>
            <Text style={[styles.pointText, { marginLeft: 10 }]}>Points</Text>
          </View>
          <View style={styles.imagePoint}>
            <Image
              source={require("../assets/coin1.png")}
              style={styles.pointImage}
            />
          </View>
        </View>
      </View>

      {/* Lifetime Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0.00</Text>
          <Text style={styles.statLabel}>Lifetime Earnings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0.00</Text>
          <Text style={styles.statLabel}>Lifetime Burns</Text>
        </View>
      </View>

      {/* Date Filter */}
      <TouchableOpacity
        style={styles.filterRow}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.filterText}>Date Filter</Text>
        <FontAwesome6
          name="sliders"
          size={24}
          color="black"
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Date Filter</Text>
            <TouchableOpacity
              style={styles.dateRow}
              onPress={() => setSelectingStart(true)}
            >
              <Text style={styles.dateText}>
                {startDate
                  ? startDate.toLocaleDateString("en-GB")
                  : "Start Date"}
              </Text>
              <FontAwesome6 name="calendar" size={20} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateRow}
              onPress={() => setSelectingStart(false)}
            >
              <Text style={styles.dateText}>
                {endDate ? endDate.toLocaleDateString("en-GB") : "End Date"}
              </Text>
              <FontAwesome6 name="calendar" size={20} color="#808080" />
            </TouchableOpacity>
            <DatePicker
              modal
              open={selectingStart !== null}
              date={
                selectingStart ? startDate || new Date() : endDate || new Date()
              }
              onConfirm={(date) => {
                if (selectingStart) {
                  setStartDate(date);
                } else {
                  setEndDate(date);
                }
                setSelectingStart(null);
              }}
              onCancel={() => setSelectingStart(null)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Points Category Selector */}
      <View style={styles.categoryRow}>
        <TouchableOpacity onPress={() => setActiveCategory("Regular Points")}>
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Regular Points" && styles.activeCategoryText,
            ]}
          >
            Regular Points
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => setActiveCategory("Extra Points")}>
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Extra Points" && styles.activeCategoryText,
            ]}
          >
            Extra Points
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => setActiveCategory("Registration Bonus")}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "Registration Bonus" &&
                styles.activeCategoryText,
            ]}
          >
            Registration Bonus
          </Text>
        </TouchableOpacity>
      </View>

      {/* No Data Placeholder */}
      <View style={styles.noDataContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="gray" />
        <Text style={styles.noDataText}>No Data</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: "bold", marginLeft: 16 },
  pointsSection: { marginBottom: 16 },
  subtitle: { fontSize: 16, color: "#343434" },
  pointsValue: { fontSize: 32, fontWeight: "900", color: "#000" },
  pointRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointText: { fontSize: 18, color: "#343434" },
  imagePoint: {
    marginRight: 50,
  },
  pointImage: { width: 80, height: 80 },
  statsRow: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // marginRight: 125,
    gap: 15,
    marginBottom: 16,
  },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "900", color: "#000" },
  statLabel: { fontSize: 14, color: "#343434", fontWeight: "400" },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#dddddd",
    width: "100%",
  },
  filterText: { fontSize: 16, color: "#000" },
  menuIcon: { marginLeft: 8 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fdfdfd",
    padding: 40,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    backgroundColor: "#dddddd",
    padding: 10,
    paddingHorizontal: 12,
  },
  activeCategoryText: { color: "red", fontWeight: "bold" },
  dateText: { fontSize: 16, color: "#000" },
  submitButton: {
    marginTop: 25,
    backgroundColor: "#c9000a",
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    left: 32,
  },
  submitText: { color: "#fff", fontSize: 25 },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
    padding: 10,
  },
  categoryText: { fontSize: 15, color: "#000" },
  divider: { width: 1, backgroundColor: "gray", height: "100%" },
  noDataContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  noDataText: { fontSize: 16, color: "gray" },
});

export default PointEarnHistory;
