import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/HomeScreen";

export default function App() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <HomeScreen></HomeScreen>
      <StatusBar style="auto" />
    </View>
  );
}
