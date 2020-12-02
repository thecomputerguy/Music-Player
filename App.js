import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MediaPlayer from "./components/MediaPlayer";

export default function App() {
  return (
    <View style={styles.container}>
      <MediaPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
