import { Text, View } from "react-native";
import { totalSize } from "react-native-dimension";

export default function ErrorText({ error }) {
  return (
    <Text style={{ fontSize: totalSize(1.5), color: "red" }}>{error}</Text>
  );
}
