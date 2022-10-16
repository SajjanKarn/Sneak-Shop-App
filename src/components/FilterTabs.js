import { FlatList, StyleSheet, Text, View } from "react-native";
import { height, totalSize, width } from "react-native-dimension";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";

const Tabs = ({ text = "All Product", active = false }) => (
  <TouchableOpacity>
    <View style={[styles.tab, active ? styles.activeTab : null]}>
      <Text style={[styles.tabText, active ? styles.activeTabText : null]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function FilterTabs() {
  const tabs = [
    { id: 1, text: "All Product", active: true },
    { id: 2, text: "Addidas" },
    { id: 3, text: "Nike" },
    { id: 4, text: "Puma" },
    { id: 5, text: "Reebok" },
    { id: 6, text: "New Balance" },
    { id: 7, text: "Vans" },
    { id: 8, text: "Converse" },
    { id: 9, text: "Fila" },
    { id: 10, text: "Asics" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Tabs text={item.text} active={item.active} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  tab: {
    backgroundColor: colors.white,
    paddingVertical: height(1.2),
    paddingHorizontal: width(10),
    borderRadius: width(10),
    borderWidth: 1.3,
    borderColor: "#E6E6E6",
    marginHorizontal: width(1),
  },
  tabText: {
    color: colors.black,
    fontSize: totalSize(1.8),
    fontFamily: "SFPro-Regular",
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeTabText: {
    color: colors.white,
  },
});
