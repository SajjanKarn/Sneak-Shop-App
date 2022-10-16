import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { width, height } from "react-native-dimension";
import colors from "../../config/colors";

const AddButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={{
        backgroundColor: colors.primary,
        width: width(18),
        height: width(18),
        borderRadius: width(15),
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        bottom: height(2),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <AntDesign name="plus" size={25} color={colors.white} />
    </TouchableOpacity>
  );
};

export default AddButton;
