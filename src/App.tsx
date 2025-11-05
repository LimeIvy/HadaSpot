import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View style={styles.container}>
      <Text className="text-red-500">
        Open up app.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
