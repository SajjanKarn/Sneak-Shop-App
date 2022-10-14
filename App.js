import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

import RegisterScreen from "./src/screens/RegisterScreen";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);

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
    <NavigationContainer>
      <View style={styles.container}>
        <AuthNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
