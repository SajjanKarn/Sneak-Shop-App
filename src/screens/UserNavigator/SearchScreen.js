import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";
import SearchInput from "../../components/SearchInput";

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <SearchInput />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.white,
  },
  searchInputContainer: {
    marginTop: height(2),
  },
});
