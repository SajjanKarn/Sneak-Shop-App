import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Button from "./src/components/Button";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    "SFPro-Light": require("./assets/fonts/SFPRODISPLAY-LIGHT.ttf"),
    "SFPro-Regular": require("./assets/fonts/SFPRODISPLAY-REGULAR.ttf"),
    "SFPro-Medium": require("./assets/fonts/SFPRODISPLAY-MEDIUM.ttf"),
    "SFPro-Bold": require("./assets/fonts/SFPRODISPLAY-BOLD.ttf"),
    "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "SFPro-Semibold": require("./assets/fonts/SFPRODISPLAY-SEMIBOLD.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Heavy": require("./assets/fonts/Gilroy-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <WelcomeScreen /> */}
      {/* <LoginScreen /> */}
      <RegisterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
